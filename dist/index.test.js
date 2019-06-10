"use strict";

var _helper = require("./helper");

// const helper = require('./helper').helper;
describe('First test', function () {
  it('should pass', function () {
    expect(10).toBe(10);
  });
  it('should be greater by 1 after helper', function () {
    var value = 15;
    expect((0, _helper.helper)(value)).toBe(value + 1);
  });
});