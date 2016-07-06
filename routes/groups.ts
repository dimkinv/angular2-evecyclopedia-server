import * as express from 'express'
import * as _ from 'lodash'
import {data} from '../data-import/data-storage'
import * as races from './races'
import {IGroup} from '../data-import/data-import'

export var router = express.Router({mergeParams: true});

router.get('/', (req:express.Request, res:express.Response)=>{
    var result:Array<IGroup> = JSON.parse(data);
    _.each(result, (group:IGroup)=>{
        delete group.races;
    })
    res.json(result);
});

router.get('/:groupId', (req:express.Request, res:express.Response)=>{
    var groups:Array<IGroup> = JSON.parse(data);
    var group = _.find(groups, {name: req.params.groupId});
    delete group.races;
    
    res.send(group);
});

router.use('/:groupId/races', races.router);