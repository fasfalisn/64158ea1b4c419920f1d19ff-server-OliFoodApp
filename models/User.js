
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
Underscoreid:String , 


useremail:String , 


password:String , 


username:String , 


usercategory:String 



})

module.exports = {
  User : mongoose.model('user', userSchema),
}

