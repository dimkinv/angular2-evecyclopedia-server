"use strict";
var fs_1 = require('fs');
var mysql = require('mysql');
var _ = require('lodash');
var ship_1 = require('./ship');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'stack',
    database: 'sdeyaml'
});
connection.connect();
connection.query('select * from sdeyaml.data', function (err, rows) {
    var results = [];
    _.each(rows, function (row) {
        var ship = findShip(results, row);
        if (ship) {
            ship.attributes.push(ship_1.buildAttribute(row));
            return;
        }
        ship = ship_1.buildShip(row);
        applyShip(results, ship);
    });
    fs_1.writeFileSync('results.json', JSON.stringify(results));
    connection.end();
});
function applyShip(results, ship) {
    var group = _.find(results, { name: ship.group });
    if (!group) {
        group = {
            name: ship.group,
            races: [{
                    name: ship.race,
                    ships: []
                }]
        };
        results.push(group);
    }
    var race = _.find(group.races, { name: ship.race });
    if (!race) {
        race = {
            name: ship.race,
            ships: []
        };
        group.races.push(race);
    }
    race.ships.push(ship);
}
function findShip(results, row) {
    var group = _.find(results, { name: row.group_name });
    if (!group) {
        return null;
    }
    var race = _.find(group.races, { name: row.race_name });
    if (!race) {
        return null;
    }
    return _.find(race.ships, { name: row.ship_name });
}
