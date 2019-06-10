#!/usr/bin/env node

import chalk from 'chalk';
import commander from 'commander';
import {terminal} from 'terminal-kit';
import {generateRanges, generateNumberInRange, findEnclosed} from './ranges';
import {MAX_VALUE, DEFAULT_RANGES_AMOUNT} from './constants';

let main_loop = null;
const program = new commander.Command();

terminal.grabInput();
terminal.on( 'key' , function( name , matches , data ) {
    if ( name === 'Q' ) {
        main_loop = null;
        process.exit();
    }
});

program
    .description(chalk.green('App generates set amount of ranges, and infinitly generates random number to check if currently generated number is enclosed by any of ranges.' +
        '\nRunning wihout param will result in default amount of ranges generated.\n Press Q to exit.'))
    .option('-N, --number <amount>', `Set amount of generated ranges (Max: ${DEFAULT_RANGES_AMOUNT})`, DEFAULT_RANGES_AMOUNT)

program.parse(process.argv);

const validateRangesNumber = () => {
    const number = Number(program.number);
    if (isNaN(number)) {
        console.log(chalk.red('Param should be a number'));
        process.exit(1);
    }

    if(number < 0 || number > DEFAULT_RANGES_AMOUNT) {
        console.log(chalk.red(`Param should be a number in range between 0 and ${DEFAULT_RANGES_AMOUNT} (MaxValue)`));
        process.exit(1);
    }
};

const findRangesProcess = (gen) => {
    const randomNumber = generateNumberInRange(0, MAX_VALUE);
    const enclosed = findEnclosed(randomNumber, gen);
    console.log(`${chalk.magenta(randomNumber)} => Enclosed by ${enclosed} range(s) `);
};

const run = () => {
    validateRangesNumber();

    const gen = generateRanges(0, MAX_VALUE, Number(program.number));
    main_loop = setInterval(findRangesProcess, 1, gen);
};

run();
