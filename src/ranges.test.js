import {generateNumberInRange, generateRange, findEnclosed, findEnclosedLoop, findEnclosedLoopSorted, isEnclosed} from './ranges';

describe('Random range generation', () => {
    it('should generate random range object', () => {
        const min = 10;
        const max = 120;
        const generatedNumber = generateNumberInRange(min, max);
        expect(generatedNumber).toBeGreaterThanOrEqual(min);
        expect(generatedNumber).toBeLessThanOrEqual(max);
    }),
    it('should generate random range object 2', () => {
        const min = 0;
        const max = 20;
        const generatedRange = generateRange(min, max);
        expect(generatedRange.min).toBeLessThanOrEqual(max);
        expect(generatedRange.min).toBeGreaterThanOrEqual(min);
        expect(generatedRange.max).toBeLessThanOrEqual(max);
    }),
    it('should generate this range as {0,1}', () => {
        const min = 0;
        const max = 1;
        const generatedRange = generateRange(min, max);
        expect(generatedRange.min).toBeLessThan(max);
        expect(generatedRange.min).toBeGreaterThanOrEqual(min);
        expect(generatedRange.max).toBeLessThanOrEqual(max);
    }),
    it('should generate this range as {999999,1000000}', () => {
        const min = 999999;
        const max = 1000000;
        const generatedRange = generateRange(min, max);
        expect(generatedRange.min).toBeLessThan(max);
        expect(generatedRange.min).toBeGreaterThanOrEqual(min);
        expect(generatedRange.max).toBeLessThanOrEqual(max);
        expect(generatedRange).toEqual({min: 999999, max: 1000000});
    }),

    describe('Filter function test', () => {

        it('should enclose 2 ranges', () => {
            const ranges = [{min: 1, max: 10}, {min: 5, max: 15}, {min: 9, max: 10}];
            const number = 7;
            const found = findEnclosed(number, ranges);
            expect(found).toBe(2);
        })
    }),

    describe('Loop function test', () => {

        it('should enclose 2 ranges', () => {
            const ranges = [{min: 1, max: 10}, {min: 5, max: 15}, {min: 9, max: 10}];
            const number = 7;
            const found = findEnclosedLoop(number, ranges);
            expect(found).toBe(2);
        })
    })

    describe('Loop Sorted function test', () => {

        it('should enclose 2 ranges', () => {
            const ranges = [{min: 1, max: 10}, {min: 5, max: 15}, {min: 9, max: 10}];
            const number = 7;
            const found = findEnclosedLoopSorted(number, ranges);
            expect(found).toBe(2);
        })
    })
})