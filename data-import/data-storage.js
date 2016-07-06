"use strict";
var path = require('path');
var fs = require('fs');
exports.data = fs.readFileSync(path.join(__dirname, '../results.json')).toString();
