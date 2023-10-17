
const { UserUserimageSchema } =require('./UserUserimage');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
Underscoreid:String , 


productname:String , 


productdesc:String , 


productimage:  
UserUserimageSchema
 , 


productcategory:String , 


productunit:String 



})

module.exports = {
  Product : mongoose.model('product', productSchema),
}

