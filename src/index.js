#!/usr/bin/env node

import chalk from 'chalk';
import commander from 'commander';
import {terminal} from 'terminal-kit';
import {generateRanges, generateNumberInRange, findEnclosed, findEnclosedLoopSorted, findEnclosedLoop} from './ranges';
import {MAX_VALUE, DEFAULT_RANGES_AMOUNT} from './constants';

import {testAllFunctions, testTime, testTimeLoop, testTimeLoopSorted} from './timeTest';

let main_loop = null;
const program = new commander.Command();

terminal.grabInput();
terminal.on('key', function (name, matches, data) {
    if (name === 'Q') {
        main_loop = null;
        process.exit();
    }
});

program
    .description(chalk.green('App generates set amount of ranges, and infinitly generates random number to check if currently generated number is enclosed by any of ranges.' +
        '\nRunning wihout param will result in default amount of ranges generated.\n Press Q to exit.'))
    .option('-N, --number <amount>', `Set amount of generated ranges (Max: ${DEFAULT_RANGES_AMOUNT})`, DEFAULT_RANGES_AMOUNT)
    .option('-T, --test', `benchmark for 3 functions used to find ranges: ${chalk.blue('Array.filter')}, ${chalk.blue('for')}, bounded ${chalk.blue('for')} with sorted ranges`)

program.parse(process.argv);

const validateRangesNumber = () => {
    const number = Number(program.number);
    if (isNaN(number)) {
        console.log(chalk.red('Param should be a number'));
        process.exit(1);
    }

    if (number < 0 || number > DEFAULT_RANGES_AMOUNT) {
        console.log(chalk.red(`Param should be a number in range between 0 and ${DEFAULT_RANGES_AMOUNT} (MaxValue)`));
        process.exit(1);
    }
};

const findRangesProcess = (gen) => {
    const randomNumber = generateNumberInRange(0, MAX_VALUE);
    const enclosed = findEnclosedLoopSorted(randomNumber, gen);
    console.log(`${chalk.magenta(randomNumber)} => Enclosed by ${chalk.blue(enclosed)} range(s) `);
};

const run = () => {
    validateRangesNumber();

    const gen = generateRanges(0, MAX_VALUE, Number(program.number));
    gen.sort((a, b) => b.max - a.max);
    main_loop = setInterval(findRangesProcess, 1, gen);
};
if(program.test) {
    testAllFunctions();
} else {
    run();
}

