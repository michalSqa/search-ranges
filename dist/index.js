#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

var _commander = _interopRequireDefault(require("commander"));

var _terminalKit = require("terminal-kit");

var _ranges = require("./ranges");

var _constants = require("./constants");

var main_loop = null;
var program = new _commander["default"].Command();

_terminalKit.terminal.grabInput();

_terminalKit.terminal.on('key', function (name, matches, data) {
  if (name === 'Q') {
    main_loop = null;
    process.exit();
  }
});

program.description(_chalk["default"].green('App generates set amount of ranges, and infinitly generates random number to check if currently generated number is enclosed by any of ranges.' + '\nRunning wihout param will result in default amount of ranges generated.\n Press Q to exit.')).option('-N, --number <amount>', "Set amount of generated ranges (Max: ".concat(_constants.DEFAULT_RANGES_AMOUNT, ")"), _constants.DEFAULT_RANGES_AMOUNT);
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
  var enclosed = (0, _ranges.findEnclosed)(randomNumber, gen);
  console.log("".concat(_chalk["default"].magenta(randomNumber), " => Enclosed by ").concat(enclosed, " range(s) "));
};

var run = function run() {
  validateRangesNumber();
  var gen = (0, _ranges.generateRanges)(0, _constants.MAX_VALUE, Number(program.number));
  main_loop = setInterval(findRangesProcess, 1, gen);
};

run();