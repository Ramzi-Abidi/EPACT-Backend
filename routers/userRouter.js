const express = require("express");
const expressAsyncHandler = require('express-async-handler')
const data = require("../data/data");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken, isAuth } = require("./utils");

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
  //await User.remove({}) ;                   //remove all users before inserting any other user
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
})
);

//signin route

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
  //console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
})
);

//signup route

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save(); //The save() function is used to save the document to the database
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

//user route :
userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


//put request to change user profile : 
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);
module.exports = userRouter;