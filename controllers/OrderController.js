/**
 * The OrderController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/OrderService');
const createorder = async (request, response) => {
  await Controller.handleRequest(request, response, service.createorder);
};

const deleteorder = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteorder);
};

const getAllorder = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllorder);
};

const getByParamsorder = async (request, response) => {
  await Controller.handleRequest(request, response, service.getByParamsorder);
};

const getorder = async (request, response) => {
  await Controller.handleRequest(request, response, service.getorder);
};

const updateorder = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateorder);
};


module.exports = {
  createorder,
  deleteorder,
  getAllorder,
  getByParamsorder,
  getorder,
  updateorder,
};
