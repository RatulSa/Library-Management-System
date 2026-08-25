const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { User, UserRole } = require("../models");
const jwt = require("jsonwebtoken");

const buildTokenPayload = (user) => ({
    uid: user.uid,
    email: user.email,
    rid: user.rid,
    role: user.role ? user.role.role_name : undefined,
});

const getUsers = async (req, res, next) => {
    try {
        const {
            search,
            role,
            sort = "uid",
            order = "asc",
        } = req.query;

        const where = {};

        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const allowedSortFields = ["uid", "name", "email"];
        const sortField = allowedSortFields.includes(sort) ? sort : "uid";
        const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

        const roleInclude = {
            model: UserRole,
            as: "role",
            attributes: ["rid", "role_name"],
        };

        if (role) {
            roleInclude.where = {
                role_name: { [Op.iLike]: role },
            };
        }

        const users = await User.findAll({
            where,
            include: [roleInclude],
            attributes: { exclude: ["password"] },
            order: [[sortField, sortOrder]],
        });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: {
                model: UserRole,
                as: "role",
                attributes: ["rid", "role_name"],
            },
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { name, email, password, rid } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const role = await UserRole.findByPk(rid);
        if (!role) {
            return res.status(404).json({
                success: false,
                message: "User role not found",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            rid,
        });

        const createdUser = await User.findByPk(user.uid, {
            include: {
                model: UserRole,
                as: "role",
                attributes: ["rid", "role_name"],
            },
            attributes: { exclude: ["password"] },
        });

        res.status(201).json({ success: true, data: createdUser });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const { name, email, password, rid } = req.body;
        const updateData = {};

        if (email !== undefined && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists",
                });
            }
            updateData.email = email;
        }

        if (name !== undefined) updateData.name = name;

        if (rid !== undefined) {
            const role = await UserRole.findByPk(rid);
            if (!role) {
                return res.status(404).json({
                    success: false,
                    message: "User role not found",
                });
            }
            updateData.rid = rid;
        }

        if (password !== undefined) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updateData);

        const updatedUser = await User.findByPk(user.uid, {
            include: {
                model: UserRole,
                as: "role",
                attributes: ["rid", "role_name"],
            },
            attributes: { exclude: ["password"] },
        });

        res.status(200).json({ success: true, data: updatedUser, message:"updated successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.destroy();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};



// POST /users/getToken  { email, password }
const getToken = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: {
                model: UserRole,
                as: "role",
                attributes: ["rid", "role_name"],
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }



        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const payload = buildTokenPayload(user);

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        //increase login count
        // console.log(user);
        
        await User.increment("login_count", {
            by: 1,
            where: {
                uid: user.uid,
            },
        });




        res.status(200).json({
            success: true,
            data: {
                accessToken,
                refreshToken,
                user: {
                    uid: user.uid,
                    name: user.name,
                    email: user.email,
                    role: user.role.role_name,
                    login_count:user.login_count,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

// POST /users/refreshToken  { token }  (a valid, non-expired refresh token)
const refreshToken = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization; // "Bearer <token>"

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }   

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required",
            });
        }

        jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid or expired refresh token",
                    });
                }

                const user = await User.findByPk(decoded.uid, {
                    include: {
                        model: UserRole,
                        as: "role",
                        attributes: ["rid", "role_name"],
                    },
                });

                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User no longer exists",
                    });
                }

                const payload = buildTokenPayload(user);

                const accessToken = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: "15m" }
                );

                res.status(200).json({
                    success: true,
                    data: { accessToken },
                });
            }
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getToken,
    refreshToken
};
