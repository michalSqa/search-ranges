import {generateRanges, generateNumberInRange, findEnclosed} from './ranges';
import {MAX_VALUE, DEFAULT_RANGES_AMOUNT} from './constants';

export const testTime = (iterations) => {
    const gen = generateRanges(0, MAX_VALUE, DEFAULT_RANGES_AMOUNT);
    let start = 0;
    let end = 0;
    let total = 0;
    let times = [];
    for (let i=0; i<iterations; i++) {
        const rN = generateNumberInRange(0, MAX_VALUE);
        console.log('RandomNumber: ', rN);
        start = new Date();
        const enclosed = findEnclosed(rN, gen);
        end = new Date()
        console.log('enclosed by: ', enclosed);
        console.log('time: ', end - start);
        times.push(end - start);
    }
    const sum = times.reduce((a,b) => a+b,0)
    console.log('avg:', sum/iterations)
}