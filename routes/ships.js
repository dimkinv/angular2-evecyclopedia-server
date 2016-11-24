"use strict";
var express = require('express');
var _ = require('lodash');
var data_storage_1 = require('../data-import/data-storage');
var request = require('request');
var shipNameToImageId = require('../public/ship-name-to-image-id.json');
exports.router = express.Router({ mergeParams: true });
var result = JSON.parse(data_storage_1.data);
exports.router.get('/', function (req, res) {
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
    var race = findRace(result, req);
    res.send(_.find(race.ships, { name: req.params.shipId }));
});
exports.router.get('/:shipName/image', function (req, res) {
    request.get({ url: 'https://www.fuzzwork.co.uk/api/typeid.php?typename=' + req.params.shipName, json: true }, function (error, response, body) {
        if (body && body.typeID) {
            res.redirect("https://image.eveonline.com/Render/" + body.typeID + "_512.png");
        }
        else {
            res.redirect("https://image.eveonline.com/Render/1_512.png");
        }
    });
});
exports.router.post('/', function (req, res) {
    var race = findRace(result, req);
    req.body.race = req.params.raceId;
    req.body.group = req.params.groupId;
    race.ships.push(req.body);
    res.send(201);
});
function findRace(result, req) {
    var races = _.find(result, function (group) {
        return group.name === req.params.groupId;
    }).races;
    return _.find(races, function (race) {
        return race.name === req.params.raceId;
    });
}
