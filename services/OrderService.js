/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { Order } = require('../models/Order');
const { User } = require('../models/User');
const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
const webpush = require('web-push');
dotenv.config();

async function sendEmail (useremail) {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    }
  });

  const mailOptions = {
      from: '"Olifood Team" <olifoodapp>', // sender address
      to: useremail, // list of receivers
      subject:
          "Olifood - Νέα Παραγγελία", // Subject line
      html: `<head>
      <meta charset="UTF-8">
      <title>Olifood</title>
    </head>
    <body>
        <div style="font-family: verdana; max-width:800px;">
        <h1>Νέα Παραγγελία</h1>
        <p>Παρακαλούμε συνδεθείτε για λεπτομέρειες.</p>
        </div>
      </body>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log("Email sent: " + info.response);
      }
  });
};

const apiKeys = {
  publicKey: "BJhKT7T_z0WIZOZ7tjgZjJZJBGG3NA3qc6c90H9U2qYX-g01wreP9eCvfCA7ULpj5OtfOJ6fK_wZfRkan9EMYbk",
  privateKey: "tNFeTKChIdDXUTatWIIqzxzgZ3-lpyOM7UAToUbpgPU"
}

webpush.setVapidDetails(
  'mailto:YOUR_MAILTO_STRING',
  apiKeys.publicKey,
  apiKeys.privateKey
);

/**
* Creates the data
*
* order Order data to be created
* returns order
* */
const createorder = ({ order }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await new Order(order).save();
      resolve(Service.successResponse({ query,}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete the element
*
* orderId String the Id parameter
* no response value expected for this operation
* */
const deleteorder = ({ orderId }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await Order.findOneAndDelete({ _id:orderId }).exec();
      resolve(Service.successResponse({ query,}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all the data
*
* returns Object
* */
const getAllorder = () => new Promise(
  async (resolve, reject) => {
    try {
      let query = {}
      query = await Order.find()
      .populate({
        path: 'ordersupplier',
        populate: {
          path: 'userproducts'        }
        })
      .exec();
      // this is a test
      resolve(Service.successResponse(query));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all the data based on user query
*
* filter String the query based on which the search is performed
* returns Object
* */
const getByParamsorder = ({ filter }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {}
      query = await Order.find(JSON.parse( filter ))
      .populate({
        path: 'ordercustomer'
      })
      .populate({
        path: 'ordersupplier',
        populate: {
          path: 'userproducts'        }
        })
      .sort({ createdAt: -1 }) 
      .exec();
      // this is a test
      resolve(Service.successResponse(query));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get the element
*
* orderId String the Id parameter
* returns order
* */
const getorder = ({ orderId }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await Order.findById(orderId)
      
      .populate({
        path: 'ordersupplier'
        })
        .populate({
          path: 'ordercustomer'
        })
        .populate({
          path: 'orderproducts',
          populate: {
            path: 'orderproduct'
          }
        })
      .exec();
      resolve(Service.successResponse({ query,}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Updates the element
*
* orderId String the Id parameter
* order Order data to be updated (optional)
* returns order
* */
const updateorder = ({ orderId, order }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      let oldOrder = {};
      oldOrder = await Order.findById({ _id:orderId }).exec();
      query = await Order.findOneAndUpdate({ _id:orderId },order, {new: true})
      .populate({
        path: 'ordersupplier'
        })
        .populate({
          path: 'ordercustomer'
        })
        .populate({
          path: 'orderproducts',
          populate: {
            path: 'orderproduct'
          }
        }).exec();
      if(oldOrder.orderstatus === 'Για αποστολή' && order.orderstatus === 'Αναμονή'){
        let user = await User.findById(order.ordersupplier).exec();
        await sendEmail(user.useremail);
        if(user.usersubscriptions !== undefined && user.usersubscriptions.length !== 0){
          user.usersubscriptions.forEach((sub) => {
              webpush.sendNotification(sub, "You have a new Order").catch(async (e)=> {
                if(e.body.includes('expired')){
                  console.log('expired');
                  user.usersubscriptions = user.usersubscriptions.filter(existingSub => existingSub !== sub);
                  await User.findByIdAndUpdate(user._id, user).exec();
                }
                else{
                  console.log(e.body);
                }
              })
          })
          }
      }
      resolve(Service.successResponse({ query,}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  createorder,
  deleteorder,
  getAllorder,
  getByParamsorder,
  getorder,
  updateorder,
};
