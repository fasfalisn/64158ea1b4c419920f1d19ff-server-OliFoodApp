/**
 * The ProductController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ProductService');
const createproduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.createproduct);
};

const deleteproduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteproduct);
};

const getAllproduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllproduct);
};

const getByParamsproduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.getByParamsproduct);
};

const getproduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.getproduct);
};

const updateproduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateproduct);
};


module.exports = {
  createproduct,
  deleteproduct,
  getAllproduct,
  getByParamsproduct,
  getproduct,
  updateproduct,
};
