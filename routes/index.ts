import * as express from 'express'
import * as groups from './groups'
import * as ships from './ships';

export var router = express.Router();
router.use('/groups', groups.router);
router.use('/ships', ships.router);

let counter = 0;
router.get('/error', (req, res)=>{
    counter++;
    if(counter< 3){
        res.status(500).end('error');
        return;
    }

    counter = 0;
    res.send('ok');
});