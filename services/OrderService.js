/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { Order } = require('../models/Order');
const { User } = require('../models/User');
const nodeMailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();

async function sendEmail (useremail) {
  const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
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
      let user = await User.findById(order.ordersupplier).exec();
      await sendEmail(user.useremail);
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
      query = await Order.findOneAndUpdate({ _id:orderId },order, {new: true}).exec();
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
