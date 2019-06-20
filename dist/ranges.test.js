"use strict";

var _ranges = require("./ranges");

describe('Random range generation', function () {
  it('should generate random range object', function () {
    var min = 10;
    var max = 120;
    var generatedNumber = (0, _ranges.generateNumberInRange)(min, max);
    expect(generatedNumber).toBeGreaterThanOrEqual(min);
    expect(generatedNumber).toBeLessThanOrEqual(max);
  }), it('should generate random range object 2', function () {
    var min = 0;
    var max = 20;
    var generatedRange = (0, _ranges.generateRange)(min, max);
    expect(generatedRange.min).toBeLessThanOrEqual(max);
    expect(generatedRange.min).toBeGreaterThanOrEqual(min);
    expect(generatedRange.max).toBeLessThanOrEqual(max);
  }), it('should generate this range as {0,1}', function () {
    var min = 0;
    var max = 1;
    var generatedRange = (0, _ranges.generateRange)(min, max);
    expect(generatedRange.min).toBeLessThan(max);
    expect(generatedRange.min).toBeGreaterThanOrEqual(min);
    expect(generatedRange.max).toBeLessThanOrEqual(max);
  }), it('should generate this range as {999999,1000000}', function () {
    var min = 999999;
    var max = 1000000;
    var generatedRange = (0, _ranges.generateRange)(min, max);
    expect(generatedRange.min).toBeLessThan(max);
    expect(generatedRange.min).toBeGreaterThanOrEqual(min);
    expect(generatedRange.max).toBeLessThanOrEqual(max);
    expect(generatedRange).toEqual({
      min: 999999,
      max: 1000000
    });
  }), describe('Filter function test', function () {
    it('should enclose 2 ranges', function () {
      var ranges = [{
        min: 1,
        max: 10
      }, {
        min: 5,
        max: 15
      }, {
        min: 9,
        max: 10
      }];
      var number = 7;
      var found = (0, _ranges.findEnclosed)(number, ranges);
      expect(found).toBe(2);
    });
  }), describe('Loop function test', function () {
    it('should enclose 2 ranges', function () {
      var ranges = [{
        min: 1,
        max: 10
      }, {
        min: 5,
        max: 15
      }, {
        min: 9,
        max: 10
      }];
      var number = 7;
      var found = (0, _ranges.findEnclosedLoop)(number, ranges);
      expect(found).toBe(2);
    });
  });
  describe('Loop Sorted function test', function () {
    it('should enclose 2 ranges', function () {
      var ranges = [{
        min: 1,
        max: 10
      }, {
        min: 5,
        max: 15
      }, {
        min: 9,
        max: 10
      }];
      var number = 7;
      var found = (0, _ranges.findEnclosedLoopSorted)(number, ranges);
      expect(found).toBe(2);
    });
  });
});