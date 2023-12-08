
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




 userproducts: [ 
  {
    type: Schema.Types.ObjectId,
    ref:'product'
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

