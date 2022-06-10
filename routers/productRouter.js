const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data/data");
const Product = require("../models/productModel");
var mongoose = require('mongoose');

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});                //bring all products
    res.send(products);         //response to the client 
})
);

/* productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
})
); */

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    mongoose.Types.ObjectId.isValid(req.params.id);

    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
})
);


module.exports = productRouter;