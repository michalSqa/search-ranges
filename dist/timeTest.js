"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testTime = void 0;

var _ranges = require("./ranges");

var _constants = require("./constants");

var testTime = function testTime(iterations) {
  var gen = (0, _ranges.generateRanges)(0, _constants.MAX_VALUE, _constants.DEFAULT_RANGES_AMOUNT);
  var start = 0;
  var end = 0;
  var total = 0;
  var times = [];

  for (var i = 0; i < iterations; i++) {
    var rN = (0, _ranges.generateNumberInRange)(0, _constants.MAX_VALUE);
    console.log('RandomNumber: ', rN);
    start = new Date();
    var enclosed = (0, _ranges.findEnclosed)(rN, gen);
    end = new Date();
    console.log('enclosed by: ', enclosed);
    console.log('time: ', end - start);
    times.push(end - start);
  }

  var sum = times.reduce(function (a, b) {
    return a + b;
  }, 0);
  console.log('avg:', sum / iterations);
};

exports.testTime = testTime;