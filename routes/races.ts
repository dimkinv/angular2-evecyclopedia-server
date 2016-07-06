import * as express from 'express'
import {data} from '../data-import/data-storage'
import * as _ from 'lodash'
import {IGroup} from '../data-import/data-import'

export var router = express.Router({mergeParams: true});

router.get('/', (req:express.Request, res:express.Response)=>{
    var groups:Array<IGroup> = JSON.parse(data);
    var group = _.find(groups, {name: req.params.groupId});
    if(!group){
        res.status(404).end();
        return;
    }

    _.each(group.races, (race)=>{
        delete race.ships;
    });
    
    res.json(group.races);
});

router.get('/:raceId', (req:express.Request, res:express.Response)=>{
    var groups:Array<IGroup> = JSON.parse(data);
    var group = _.find(groups, {name: req.params.groupId});
    if(!group){
        res.status(404).end();
        return;
    }
    var race = _.find(group.races, {name: req.params.raceId});
    res.json(race);
});

