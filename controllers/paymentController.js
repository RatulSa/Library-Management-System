const Payment = require("../models/payments");
const  {User}  = require("../models/index");

const getPayments = async (req, res, next) => {
    try {
        const payments = await Payment.findAll({
            include: {
                model: User,
                as: "user",
                attributes: ["uid", "name", "email"],
            },
            order: [["pid", "ASC"]],
        });

        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments,
        });
    } catch (error) {
        next(error);
    }
};

const getPaymentById = async (req, res, next) => {
    try {
        const payment = await Payment.findByPk(req.params.id, {
            include: {
                model: User,
                as: "user",
                attributes: ["uid", "name", "email"],
            },
        });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        next(error);
    }
};

const createPayment = async (req, res, next) => {
    try {
        const { uid, amount, date } = req.body;

        const user = await User.findByPk(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (amount === undefined || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be greater than 0",
            });
        }

        const payment = await Payment.create({
            uid,
            amount,
            date,
        });

        const createdPayment = await Payment.findByPk(payment.pid, {
            include: {
                model: User,
                as: "user",
                attributes: ["uid", "name", "email"],
            },
        });

        res.status(201).json({ success: true, data: createdPayment });
    } catch (error) {
        next(error);
    }
};

const updatePayment = async (req, res, next) => {
    try {
        const payment = await Payment.findByPk(req.params.id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        const { uid, amount, date } = req.body;
        const updateData = {};

        if (uid !== undefined) {
            const user = await User.findByPk(uid);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            updateData.uid = uid;
        }

        if (amount !== undefined) {
            if (Number(amount) <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Amount must be greater than 0",
                });
            }
            updateData.amount = amount;
        }

        if (date !== undefined) updateData.date = date;

        await payment.update(updateData);

        const updatedPayment = await Payment.findByPk(payment.pid, {
            include: {
                model: User,
                as: "user",
                attributes: ["uid", "name", "email"],
            },
        });

        res.status(200).json({ success: true, data: updatedPayment });
    } catch (error) {
        next(error);
    }
};

const deletePayment = async (req, res, next) => {
    try {
        const payment = await Payment.findByPk(req.params.id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        await payment.destroy();

        res.status(200).json({
            success: true,
            message: "Payment deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
};
