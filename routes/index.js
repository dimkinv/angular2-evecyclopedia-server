"use strict";
var express = require('express');
var groups = require('./groups');
var ships = require('./ships');
exports.router = express.Router();
exports.router.use('/groups', groups.router);
exports.router.use('/ships', ships.router);
var counter = 0;
exports.router.get('/error', function (req, res) {
    counter++;
    if (counter < 3) {
        res.status(500).end('error');
        return;
    }
    counter = 0;
    res.send('ok');
});
