const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
     category:{
        type:String
    },
     company:{
        type:String
    },
    userId:{
       type:String
   }
})

const Product = mongoose.model('product',productSchema);

module.exports = Product