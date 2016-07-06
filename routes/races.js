"use strict";
var express = require('express');
var data_storage_1 = require('../data-import/data-storage');
var _ = require('lodash');
exports.router = express.Router({ mergeParams: true });
exports.router.get('/', function (req, res) {
    var groups = JSON.parse(data_storage_1.data);
    var group = _.find(groups, { name: req.params.groupId });
    if (!group) {
        res.status(404).end();
        return;
    }
    _.each(group.races, function (race) {
        delete race.ships;
    });
    res.json(group.races);
});
exports.router.get('/:raceId', function (req, res) {
    var group = _.find(jsonData, { name: req.params.groupId });
    console.log(group);
    if (!group) {
        res.status(404).end();
        return;
    }
    var race = _.find(group.races, { name: req.params.raceId });
    res.json(race);
});
