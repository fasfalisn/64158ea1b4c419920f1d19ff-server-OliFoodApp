
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
Underscoreid:String , 


useremail:String 



})

module.exports = {
  User : mongoose.model('user', userSchema),
}

