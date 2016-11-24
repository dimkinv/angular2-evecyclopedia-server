"use strict";
var express = require('express');
var groups = require('./groups');
var ships = require('./ships');
exports.router = express.Router();
exports.router.use('/groups', groups.router);
exports.router.use('/ships', ships.router);
