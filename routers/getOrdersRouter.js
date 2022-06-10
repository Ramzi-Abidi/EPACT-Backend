const express = require("express");
const Order = require("../models/orderModel");

const getOrdersRouter = express.Router();

getOrdersRouter.get("/", async (req, res) => {
    try {
        const orders = await Order.find({});
        console.log(orders);
        res.send(orders);
    } catch (err) {
        console.log(err);
        res.status(501).send({ message: "error occured, try later" });
    }

});

module.exports = getOrdersRouter;