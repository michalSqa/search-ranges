"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testAllFunctions = void 0;

var _ranges = require("./ranges");

var _constants = require("./constants");

var _this = void 0;

var testTime = function testTime(func, type, config) {
  var iterations = config.iterations,
      genRanges = config.genRanges,
      genNumbers = config.genNumbers;
  var gen = genRanges;
  var start = 0;
  var end = 0;
  var times = [];

  for (var i = 0; i < iterations; i++) {
    var rN = genNumbers[i];
    start = new Date();
    var enclosed = func(rN, gen);
    end = new Date();
    times.push(end - start);
  }

  var sum = times.reduce(function (a, b) {
    return a + b;
  }, 0);
  console.log("".concat(type, " avg:"), sum / iterations);
};

var testAllFunctions = function testAllFunctions() {
  var iterations = 10;
  var genRanges = (0, _ranges.generateRanges)(0, _constants.MAX_VALUE, _constants.DEFAULT_RANGES_AMOUNT);
  genRanges.sort(function (a, b) {
    return b.max - a.max;
  });
  var genNumbers = [];

  for (var i = 0; i < iterations; i++) {
    genNumbers.push((0, _ranges.generateNumberInRange)(0, _constants.MAX_VALUE));
  }

  var data = {
    iterations: iterations,
    genRanges: genRanges,
    genNumbers: genNumbers
  };
  testTime(_ranges.findEnclosed.bind(_this), 'Filter', data);
  testTime(_ranges.findEnclosedLoop.bind(_this), 'Loop', data);
  testTime(_ranges.findEnclosedLoopSorted.bind(_this), 'bounded Loop', data);
};

exports.testAllFunctions = testAllFunctions;