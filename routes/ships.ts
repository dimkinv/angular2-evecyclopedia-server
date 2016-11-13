import * as express from 'express'
import * as _ from 'lodash'
import {data} from '../data-import/data-storage'
import {IGroup} from '../data-import/data-import'

export let router = express.Router({mergeParams: true});

router.get('/', (req: express.Request, res: express.Response)=> {
    var result: Array<IGroup> = JSON.parse(data);
    let race = findRace(result, req);

    let response = _.map(race.ships, (ship)=> {
        return {
            name: ship.name,
            group: ship.group,
            race: ship.race
        };
    });

    res.json(response);
});

router.get('/:shipId', (req: express.Request, res: express.Response)=> {
    var result: Array<IGroup> = JSON.parse(data);
    let race = findRace(result, req);

    res.send( _.find(race.ships, {name: req.params.shipId}));
});

function findRace(result, req) {
    let races = _.find(result, (group: IGroup)=> {
        return group.name === req.params.groupId;
    }).races;

    return _.find(races, (race)=> {
        return race.name === req.params.raceId;
    });
}