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
    var group = _.find(result, function (group) {
        return group.name === req.body.group;
    });
    if (!group) {
        res.status(400).end("group " + req.body.group + " not found");
        return;
    }
    var race = _.find(group.races, function (race) {
        return race.name === req.body.race;
    });
    if (!race) {
        res.status(400).end("race " + req.body.race + " not found");
        return;
    }
    var ship = _.find(race.ships, function (ship) {
        return ship.name === req.body.name;
    });
    if (ship || !req.body.name) {
        res.status(400).end("ship with the name " + req.body.name + " already exist");
        return;
    }
    race.ships.push(req.body);
    res.status(201).json(req.body);
});
exports.router.put('/', function (req, res) {
    var group = _.find(result, function (group) {
        return group.name === req.body.group;
    });
    if (!group) {
        res.status(400).end("group " + req.body.group + " not found");
        return;
    }
    var race = _.find(group.races, function (race) {
        return race.name === req.body.race;
    });
    if (!race) {
        res.status(400).end("race " + req.body.race + " not found");
        return;
    }
    var ship = _.find(race.ships, function (ship) {
        return ship.name === req.body.name;
    });
    if (!ship) {
        res.status(400).end("ship with the name " + req.body.name + " not found");
        return;
    }
    _.remove(race.ships, ship);
    race.ships.push(req.body);
    res.status(204).end();
});
function findRace(result, req) {
    var races = _.find(result, function (group) {
        return group.name === req.params.groupId;
    }).races;
    return _.find(races, function (race) {
        return race.name === req.params.raceId;
    });
}
exports.shipUpdateRouter = express.Router();
exports.router.use('/', exports.shipUpdateRouter);
