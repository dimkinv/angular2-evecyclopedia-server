"use strict";
var express = require('express');
var _ = require('lodash');
var data_storage_1 = require('../data-import/data-storage');
var races = require('./races');
exports.router = express.Router({ mergeParams: true });
exports.router.get('/', function (req, res) {
    var result = JSON.parse(data_storage_1.data);
    _.each(result, function (group) {
        delete group.races;
    });
    res.json(result);
});
exports.router.get('/:groupId', function (req, res) {
    var groups = JSON.parse(data_storage_1.data);
    var group = _.find(groups, { name: req.params.groupId });
    delete group.races;
    res.send(group);
});
exports.router.use('/:groupId/races', races.router);
