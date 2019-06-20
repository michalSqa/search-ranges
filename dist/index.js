#!/usr/bin/env node
"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _commander = _interopRequireDefault(require("commander"));

var _terminalKit = require("terminal-kit");

var _ranges = require("./ranges");

var _constants = require("./constants");

var _timeTest = require("./timeTest");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var main_loop = null;
var program = new _commander["default"].Command();

_terminalKit.terminal.grabInput();

_terminalKit.terminal.on('key', function (name, matches, data) {
  if (name === 'Q') {
    main_loop = null;
    process.exit();
  }
});

program.description(_chalk["default"].green('App generates set amount of ranges, and infinitly generates random number to check if currently generated number is enclosed by any of ranges.' + '\nRunning wihout param will result in default amount of ranges generated.\n Press Q to exit.')).option('-N, --number <amount>', "Set amount of generated ranges (Max: ".concat(_constants.DEFAULT_RANGES_AMOUNT, ")"), _constants.DEFAULT_RANGES_AMOUNT).option('-T, --test', "benchmark for 3 functions used to find ranges: ".concat(_chalk["default"].blue('Array.filter'), ", ").concat(_chalk["default"].blue('for'), ", bounded ").concat(_chalk["default"].blue('for'), " with sorted ranges"));
program.parse(process.argv);

var validateRangesNumber = function validateRangesNumber() {
  var number = Number(program.number);

  if (isNaN(number)) {
    console.log(_chalk["default"].red('Param should be a number'));
    process.exit(1);
  }

  if (number < 0 || number > _constants.DEFAULT_RANGES_AMOUNT) {
    console.log(_chalk["default"].red("Param should be a number in range between 0 and ".concat(_constants.DEFAULT_RANGES_AMOUNT, " (MaxValue)")));
    process.exit(1);
  }
};

var findRangesProcess = function findRangesProcess(gen) {
  var randomNumber = (0, _ranges.generateNumberInRange)(0, _constants.MAX_VALUE);
  var enclosed = (0, _ranges.findEnclosedLoopSorted)(randomNumber, gen);
  console.log("".concat(_chalk["default"].magenta(randomNumber), " => Enclosed by ").concat(_chalk["default"].blue(enclosed), " range(s) "));
};

var run = function run() {
  validateRangesNumber();
  var gen = (0, _ranges.generateRanges)(0, _constants.MAX_VALUE, Number(program.number));
  gen.sort(function (a, b) {
    return b.max - a.max;
  });
  main_loop = setInterval(findRangesProcess, 1, gen);
};

if (program.test) {
  (0, _timeTest.testAllFunctions)();
} else {
  run();
}