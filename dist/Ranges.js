"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findEnclosed = exports.isEnclosed = exports.generateRanges = exports.generateRange = exports.generateNumberInRange = void 0;

var _constants = require("./constants");

var generateNumberInRange = function generateNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.generateNumberInRange = generateNumberInRange;

var generateRange = function generateRange(min, max) {
  var generated_min = generateNumberInRange(min, max - 1);
  var generated_max = generateNumberInRange(generated_min + 1, max);
  return {
    min: generated_min,
    max: generated_max
  };
};

exports.generateRange = generateRange;

var generateRanges = function generateRanges(min, max, amount) {
  return new Array(amount).fill().map(function () {
    return generateRange(0, _constants.MAX_VALUE);
  });
};

exports.generateRanges = generateRanges;

var isEnclosed = function isEnclosed(value, range) {
  return range.min <= value && range.max > value;
};

exports.isEnclosed = isEnclosed;

var findEnclosed = function findEnclosed(value, ranges) {
  return ranges.filter(function (range) {
    return isEnclosed(value, range);
  }).length;
};

exports.findEnclosed = findEnclosed;