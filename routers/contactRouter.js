const express = require("express");
const { isAuth } = require("../routers/utils");
const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/Message");
const nodemailer = require("nodemailer");


const contactRouter = express.Router();

contactRouter.post('/',
    expressAsyncHandler(async (req, res) => {

        const message = new Message({
            userName: req.body.userName,
            email: req.body.email,
            numTel: req.body.numTel,
            message: req.body.message
        });
        const createMessage = await message.save();

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
                subject: "Message", // Subject line
                text: "Message", // plain text body
                html: `
                    <b> Vous avez reçu un nouveau message : </b> <br> 
                        <li> Nom : ${req.body.userName} </li>
                        <li> Email : ${req.body.email} </li>
                        <li> Num Tel : ${req.body.numTel} </li>
                        <li> Message: ${req.body.message} </li>
                    `, // html body
            });
        }
        main().catch(console.error);
        if (console.error)
            res.status(501).send({ message: 'error' });
        else
            res.status(201).send({ message: 'New Message Sent', order: createMessage });

    })
);
module.exports = contactRouter;