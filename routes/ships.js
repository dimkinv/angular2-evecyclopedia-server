"use strict";
var express = require('express');
var _ = require('lodash');
var data_storage_1 = require('../data-import/data-storage');
exports.router = express.Router({ mergeParams: true });
exports.router.get('/', function (req, res) {
    var result = JSON.parse(data_storage_1.data);
    var race = findRace(result, req);
    var response = _.map(race.ships, function (ship) {
        return {
            name: ship.name,
            group: ship.group,
            race: ship.race
        };
    });
    res.json(response);
});
exports.router.get('/:shipId', function (req, res) {
    var result = JSON.parse(data_storage_1.data);
    var race = findRace(result, req);
    res.send(_.find(race.ships, { name: req.params.shipId }));
});
function findRace(result, req) {
    var races = _.find(result, function (group) {
        return group.name === req.params.groupId;
    }).races;
    return _.find(races, function (race) {
        return race.name === req.params.raceId;
    });
}
