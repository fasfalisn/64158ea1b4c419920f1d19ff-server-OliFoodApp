/**
 * The UserController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/UserService');
const createuser = async (request, response) => {
  await Controller.handleRequest(request, response, service.createuser);
};

const deleteuser = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteuser);
};

const getAlluser = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAlluser);
};

const getByParamsuser = async (request, response) => {
  await Controller.handleRequest(request, response, service.getByParamsuser);
};

const getuser = async (request, response) => {
  await Controller.handleRequest(request, response, service.getuser);
};

const updateuser = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateuser);
};


module.exports = {
  createuser,
  deleteuser,
  getAlluser,
  getByParamsuser,
  getuser,
  updateuser,
};
