"use strict";
var express = require('express');
var data_storage_1 = require('../data-import/data-storage');
var _ = require('lodash');
var ships_1 = require('./ships');
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
    var groups = JSON.parse(data_storage_1.data);
    var group = _.find(groups, { name: req.params.groupId });
    if (!group) {
        res.status(404).end();
        return;
    }
    var race = _.find(group.races, { name: req.params.raceId });
    res.json(race);
});
exports.router.use('/:raceId/ships', ships_1.router);
