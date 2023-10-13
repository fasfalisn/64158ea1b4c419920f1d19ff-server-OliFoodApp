/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { User } = require('../models/User');

/**
* Creates the data
*
* user User data to be created
* returns user
* */
const createuser = ({ user }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await new User(user).save();
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
* userId String the Id parameter
* no response value expected for this operation
* */
const deleteuser = ({ userId }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await User.findOneAndDelete({ _id:userId }).exec();
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
const getAlluser = () => new Promise(
  async (resolve, reject) => {
    try {
      let query = {}
      query = await User.find().exec();
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
const getByParamsuser = ({ filter }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {}
      query = await User.find(JSON.parse( filter )).exec();
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
* userId String the Id parameter
* returns user
* */
const getuser = ({ userId }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await User.findById(userId)
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
* userId String the Id parameter
* user User data to be updated (optional)
* returns user
* */
const updateuser = ({ userId, user }) => new Promise(
  async (resolve, reject) => {
    try {
      let query = {};
      query = await User.findOneAndUpdate({ _id:userId },user).exec();
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
  createuser,
  deleteuser,
  getAlluser,
  getByParamsuser,
  getuser,
  updateuser,
};
