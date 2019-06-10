import {MAX_VALUE} from './constants';

export const generateNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRange = (min,max) => {
    const generated_min = generateNumberInRange(min, max - 1);
    const generated_max = generateNumberInRange(generated_min + 1, max);
    return {min: generated_min, max: generated_max};
};

export const generateRanges = (min, max, amount) => {
    return new Array(amount).fill().map(() => generateRange(0, MAX_VALUE));
};

export const isEnclosed = (value, range) => {
    return range.min <= value && range.max > value;
};

export const findEnclosed = (value, ranges) => ranges.filter((range) => isEnclosed(value, range)).length;
