import Product from '../models/productsModel.js';
import User from '../models/UserModel.js';
import { Op } from 'sequelize';

export const getProducts = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Product.findAll({
                attributes: ['uuid', 'client', 'date', 'subtotal', 'discount', 'total'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Product.findAll({
                attributes: ['uuid', 'client', 'date', 'subtotal', 'discount', 'total'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getProductsById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Product not found" });
        let response;
        if (req.role === "admin") {
            response = await Product.findOne({
                attributes: ['uuid', 'client', 'date', 'subtotal', 'discount', 'total'],
                where: {
                    id: product.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Product.findOne({
                attributes: ['uuid', 'client', 'date', 'subtotal', 'discount', 'total'],
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createProducts = async (req, res) => {
    const { client, date, productId, quantity, productName, subtotal, discount, total } = req.body;
    try {
        const userId = req.userId;
        await Product.create({
            client: client,
            date: date,
            productId: productId,
            quantity: quantity,
            productName: productName,
            subtotal: subtotal,
            discount: discount,
            total: total,
            userId: userId
        });
        res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateProducts = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Product not found" });
        const { client, date, productId, quantity, productName, subtotal, discount, total } = req.body;
        if (req.role === "admin") {
            await Product.update({ client, date, productId, quantity, productName, subtotal, discount, total }, {
                where: {
                    id: product.id
                }
            });
        } else {
            if (req.userId !== product.userId) return res.status(403).json({ msg: "Product not found with id" });
            await Product.update({ client, date, productId, quantity, productName, subtotal, discount, total }, {
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteProducts = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Product not found" });
        if (req.role === "admin") {
            await Product.destroy({
                where: {
                    id: product.id
                }
            });
        } else {
            if (req.userId !== product.userId) return res.status(403).json({ msg: "Product not identified" });
            await Product.destroy({
                where: {
                    [Op.and]: [{ id: product.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
