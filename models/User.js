
const { UserUserimageSchema } =require('./UserUserimage');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
Underscoreid:String , 


useremail:String , 


password:String , 


username:String , 


usercategory:String , 


userimage:  
UserUserimageSchema
 , 


 userphone: String,


 userproducts: [ 
  {
    type: Schema.Types.ObjectId,
    ref:'product'
  }

]
, 

usersavedproducts: [ 
  {
    type: Schema.Types.ObjectId,
    ref:'product'
  }

]
,

usersuppliers: [ 
  {
    type: Schema.Types.ObjectId,
    ref:'user'
  }

]
,

userstatus:String , 

usersubscriptions: [Object],

usertown:String , 


useraddress:String , 


usertax:String 



})

module.exports = {
  User : mongoose.model('user', userSchema),
}

