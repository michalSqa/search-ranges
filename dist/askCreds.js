"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inquirer = _interopRequireDefault(require("inquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var askGithubCredentials = function askGithubCredentials() {
  var questions = [{
    name: 'username',
    type: 'input',
    message: 'Enter your GitHub username or e-mail address:',
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your username or e-mail address.';
      }
    }
  }, {
    name: 'password',
    type: 'password',
    message: 'Enter your password:',
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your password.';
      }
    }
  }];
  return _inquirer["default"].prompt(questions);
};

var _default = askGithubCredentials;
exports["default"] = _default;