import {generateRanges, generateNumberInRange, findEnclosed, findEnclosedLoop, findEnclosedLoopSorted} from './ranges';
import {MAX_VALUE, DEFAULT_RANGES_AMOUNT} from './constants';

const testTime = (func, type, config) => {
    const {iterations, genRanges, genNumbers} = config;
    const gen = genRanges
    let start = 0;
    let end = 0;
    let times = [];
    for (let i = 0; i < iterations; i++) {
        let rN = genNumbers[i];
        start = new Date();
        const enclosed = func(rN, gen);
        end = new Date()
        times.push(end - start);
    }
    const sum = times.reduce((a, b) => a + b, 0)
    console.log(`${type} avg:`, sum / iterations)
};

export const testAllFunctions = () => {
    const iterations = 1000;
    const genRanges = generateRanges(0, MAX_VALUE, DEFAULT_RANGES_AMOUNT);
    genRanges.sort((a, b) => b.max - a.max);

    const genNumbers = [];
    for (let i = 0; i < iterations; i++) {
        genNumbers.push(generateNumberInRange(0, MAX_VALUE));
    }

    const data = {iterations, genRanges, genNumbers}

    testTime(findEnclosed.bind(this), 'Filter', data);
    testTime(findEnclosedLoop.bind(this), 'Loop', data);
    testTime(findEnclosedLoopSorted.bind(this), 'bounded Loop', data);
};
