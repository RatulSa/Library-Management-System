const jwt = require("jsonwebtoken");

/**
 * Verifies the access token sent in the Authorization header
 * as "Bearer <token>" and attaches the decoded payload to req.user.
 */
const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token missing",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: err
            });
        }

        req.user = decoded; // { uid, rid, role, email }
        next();
    });
};

/**
 * Restricts access to the given role name(s).
 * Usage: authorize("Librarian")
 */
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated",
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action",
            });
        }

        next();
    };
};

module.exports = { authenticate, authorize };
