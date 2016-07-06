"use strict";
var express = require('express');
var groups = require('./groups');
exports.router = express.Router();
exports.router.use('/groups', groups.router);
