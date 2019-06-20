export const generateNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRange = (min, max) => {
    const generated_min = generateNumberInRange(min, max - 1);
    const generated_max = generateNumberInRange(generated_min + 1, max);
    return {min: generated_min, max: generated_max};
};

export const generateRanges = (min, max, amount) => {
    return new Array(amount).fill().map(() => generateRange(0, max));
};

export const isEnclosed = (value, range) => {
    return range.min <= value && range.max > value;
};

export const findEnclosed = (value, ranges) => ranges.filter((range) => {
    return isEnclosed(value, range)
}).length;

export const findEnclosedLoop = (value, ranges) => {
    let enclosed = 0;
    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (isEnclosed(value, range)) {
            enclosed++
        }
    }
    return enclosed;
};

export const findEnclosedLoopSorted = (value, ranges) => {
    let enclosed = 0;
    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (value > range.max) {
            return enclosed;
        }

        if (isEnclosed(value, range)) {
            enclosed++
        }
    }
    return enclosed;
};
