const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    //_id:{type:String,required:true},
    name: { type: String },
    image: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product; 