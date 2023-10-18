/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { Order } = require('../models/Order');

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
