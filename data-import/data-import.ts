import {writeFileSync} from 'fs';
import * as mysql from 'mysql';
import * as _ from 'lodash';
import {IDBRow, IShip, buildAttribute, buildShip} from './ship'

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'stack',
    database: 'sdeyaml'
});

connection.connect();
connection.query('select * from sdeyaml.data', (err, rows: Array<IDBRow>) => {
    var results: Array<IGroup> = [];
    _.each(rows, (row: IDBRow) => {
        var ship = findShip(results, row);
        if (ship) {
            ship.attributes.push(buildAttribute(row));
            return;
        }
        ship = buildShip(row);
        applyShip(results, ship);

    });
    writeFileSync('results.json', JSON.stringify(results));
    connection.end();
});



function applyShip(results: Array<IGroup>, ship: IShip) {
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

function findShip(results: Array<IGroup>, row: IDBRow): IShip {
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

export interface IGroup {
    name: string;
    races: [{
        name: string;
        ships: Array<IShip>
    }]

}

