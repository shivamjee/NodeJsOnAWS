var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/homepage.html'));
});

module.exports = router;
