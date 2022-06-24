const { isAuth } = require("../routers/utils");
const Order = require("../models/orderModel");
const expressAsyncHandler = require("express-async-handler");
const express = require("express");
const nodemailer = require("nodemailer");

const orderRouter = express.Router();

/* orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
); */

orderRouter.post('/', isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' });
        } else {
            /*             await Order.remove({}); */

            const order = new Order({
                tel: req.body.numTel,
                email: req.body.email,
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                totalPrice: req.body.totalPrice,
            });
            const createdOrder = await order.save();
            res.status(201).send({ message: 'New Order Created', order: createdOrder });

            //sending the email to the admin :
            async function main() {

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: process.env.SENDER, // generated ethereal user
                        pass: process.env.SENDER_PASSWORD, // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: process.env.SENDER, // sender address
                    to: process.env.RECEIVER_EMAIL, // list of receivers
                    subject: "Nouvelle Commande", // Subject line
                    text: "Orders", // plain text body
                    html: `
                    <b> Vous avez reçu une nouvelle commande : </b>
                        <li> Nom : ${req.body.shippingAddress.fullName} </li>
                        <li> Num Tel : ${req.body.numTel} </li>
                        <li> Email : ${req.body.email} </li>
                        <li> Pays : ${req.body.shippingAddress.country} </li>
                        <li> Produits : ${req.body.orderItems[0].name} * ${req.body.orderItems[0].qty}  </li>
                        <li> Total : ${req.body.totalPrice} dt </li>
                    `, // html body
                });
            }
            main().catch(console.error);
        }
    })
);

module.exports = orderRouter ;