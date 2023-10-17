/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { Product } = require('../models/Product');

/**
* Creates the data
*
* product Product data to be created
* returns product
* */
const createproduct = ({ product }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await new Product(product).save();
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
* productId String the Id parameter
* no response value expected for this operation
* */
const deleteproduct = ({ productId }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await Product.findOneAndDelete({ _id:productId }).exec();
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
const getAllproduct = () => new Promise(
  async (resolve, reject) => {
    try {
      let query = {}
      query = await Product.find().exec();
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
const getByParamsproduct = ({ filter }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {}
      query = await Product.find(JSON.parse( filter )).exec();
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
* productId String the Id parameter
* returns product
* */
const getproduct = ({ productId }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await Product.findById(productId)
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
* productId String the Id parameter
* product Product data to be updated (optional)
* returns product
* */
const updateproduct = ({ productId, product }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await Product.findOneAndUpdate({ _id:productId },product).exec();
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
  createproduct,
  deleteproduct,
  getAllproduct,
  getByParamsproduct,
  getproduct,
  updateproduct,
};
