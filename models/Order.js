
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
Underscoreid:String , 

orderstatus:String , 



ordercustomer:  
  {
    type: Schema.Types.ObjectId,
    ref:'user'
  }

 , 


ordersupplier:  
  {
    type: Schema.Types.ObjectId,
    ref:'user'
  },

 
  orderproducts: [
    {
    orderproduct: {
      type: Schema.Types.ObjectId,
      ref: 'product'
    },
    orderproductquantity: {
      type: Number
    }
  }
  ],

  createdAt: {
    type: Date,
    default: Date.now // Set the default value to the current date and time
  }



})

module.exports = {
  Order : mongoose.model('order', orderSchema),
}

