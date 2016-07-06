import * as express from 'express'
import * as groups from './groups'

export var router = express.Router();
router.use('/groups', groups.router);
