const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const getOrdersRouter = require("./routers/getOrdersRouter");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const dotenv = require("dotenv");
const orderRouter = require("./routers/orderRoute");
const contactRouter = require("./routers/contactRouter");
const Post = require("./models/postModel");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const commentRouter = require("./routers/commentRouter");


dotenv.config();

let app = express();
const data = require("./data/data");
const Product = require("./models/productModel");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to db successfully");
});
//app.use(express.static(path.join(__dirname,"../../client/build"))) ;
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("home routeee");
});

//post request to add post to the server
app.post("/post", async (req, res) => {

    const post = await Post.findOne({ postContent: req.body.postContent });

    if (post) {
        res.json({ message: "post already existed" });
    }

    //the post doesn't exist :)
    else {
        const createdPost = await Post.create(req.body);
        res.status(201).json({ createdPost });
    }
});

//get all posts :
app.get("/api/getAllPosts", async (req, res) => {
    try {
        const allPosts = await Post.find({});        //getting all posts
        res.status(201).send(allPosts);
    } catch (err) {
        res.status(500).json({ message: "smthng went wrong!" });
    }
});

//delete post
app.delete("/api/posts/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const deletedTask = await Post.findOneAndDelete({ _id: req.params.id });
        if (deletedTask == null)
            res.status(404).json({ message: `No post with id ${req.params.id}` });
        else
            res.status(200).json(deletedTask);

    } catch (err) {
        res.status(500).json({ message: err });
    }
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {
        //console.log(file);
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

//add product
app.post("/addProducts", upload.single("product_image"), async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.file.originalname,
            price: req.body.price
        });

        console.log(product);

        let a = await product.save();
        if (a) {
            res.status(200).json({ message: "product created successfully" });
        }

    }
    catch (err) {
        res.status(500).json({ message: "failed" });
    }
});

//delete product
app.delete("/api/products/:id", async (req, res) => {

    console.log(req.params.id);
    try {
        const deletedProdFind = await Product.findOne({ _id: req.params.id });
        const deletedTask = await Product.findOneAndDelete({ _id: req.params.id });
        if (deletedTask == null)
            res.status(404).json({ message: `No product with id ${req.params.id}` });
        else {
            fs.unlink(`./public/${deletedProdFind.image}`, (err) => {
                if (err)
                    throw err;
            });
            res.status(200).json(deletedTask);
            /* await unlinkAsync(`../my-app/public/images/${deletedProdFind.name}`); */
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

//edit product :
app.put("/api/editProducts/:id", upload.single("product_image"), async (req, res) => {
    try {
        let prod = await Product.findById(req.params.id);
        prod.name = req.body.name;
        prod.image = req.file.originalname;
        prod.price = req.body.price;

        let a = await prod.save();
        res.json({ message: "updated successfully" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
})

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/contactUs", contactRouter);
app.use("/api/getOrders", getOrdersRouter);
app.use("/api/comments", commentRouter);


app.use((err, req, res, next) => {          //middleware fct for handling errors
    res.status(500).send({ message: err.message });
});


const port = 5000;

app.listen(port, () => {
    console.log("server is running on port " + port);
})