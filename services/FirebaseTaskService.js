'use strict';

const _ = require('lodash');
const debug = require('debug')('Demo:FirebaseTaskService');
const Boom = require('boom');
const fbtaskModel = require('../models/firebasetask');


// add task
exports.getAll = function (req, res, next) {
  debug('inside getAll firebasetaskservice');
  try {
    let response = [];

    fbtaskModel.findAll(function (error, result) {
      if (error) {
        return next(error);
      }

      if(result) {
        _.findKey(result, function (o) {
          response.push(o);
        });
        response.forEach((element) => {
          element.key = _.findKey(result, element);
        });
      }
      req.session.fbTaskStore = response;
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

exports.delete = function (req, res, next) {
  debug('inside delete firebasetaskservice');
  let params = req.params;

  try {
    if (!params) {
      return next(Boom.badRequest('Invalid task!'), null);
    } else if (!params.key) {
      return next(Boom.badRequest('Invalid id!'), null);
    }
    fbtaskModel.deleteById({
      'id': req.params.key
    }, function (error, result) {
      if (error || !result) {
        return next(Boom.badRequest(error));
      }
      req.session.fbTaskStore = result;
      return next();
    });
   
  } catch (error) {
    return next(error);
  }
};

exports.taskset = function (req, res, next) {
  debug('inside taskset firebasetaskservice');
  let params = req.body;
  let taskList = [];
  
  try {
    let set = {
      'clientname': params.clientname,
      'content': params.content,
      'done': params.done
    };

    let addData = {
      'set': _.compactObject(set)
    };

    fbtaskModel.insert({
      'newTask': addData.set
    }, function (error, result) {
      if (error || !result) {
        return next(Boom.badRequest('Could not add task please try again!'));
      }
      taskList = result;
      req.session.fbTaskStore = taskList;
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateTask = function (req, res, next) {
  debug('inside updateTask firebasetaskservice');
  let params = _.merge(req.body, req.params);
  let updatedData;
  let set;

  try {
    if (!params) {
      return next(Boom.badRequest('Invalid task!'), null);
    } else if (!params.key) {
      return next(Boom.badRequest('Invalid id!'), null);
    }
    set = {
      'clientname': params.clientname,
      'content': params.content,
      'done': params.done
    };
    updatedData = {
      'set': _.compactObject(set)
    };
    fbtaskModel.findOneAndUpdate({
      'id': req.params.key,
      'updatedData': updatedData.set
    }, function (error, result) {
      if (error || !result) {
        return next(Boom.badRequest(error));
      }
      req.session.fbTaskStore = result;
      return next();
    });

  } catch (error) {
    return next(error);
  }
};
