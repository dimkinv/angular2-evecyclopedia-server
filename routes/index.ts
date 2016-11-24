import * as express from 'express'
import * as groups from './groups'
import * as ships from './ships';

export var router = express.Router();
router.use('/groups', groups.router);
router.use('/ships', ships.router);