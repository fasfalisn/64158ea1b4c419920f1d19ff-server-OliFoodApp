
const { UserUserimageSchema } =require('./UserUserimage');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
Underscoreid:String , 


productName:String , 


productDesc:String , 


productImage:  
UserUserimageSchema
 , 


productCategory:String , 


productUnit:String ,

usersSavedIt: [
  {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
]



})

module.exports = {
  Product : mongoose.model('product', productSchema),
}

