const {defaults} = require('jest-config');
module.exports = {
    modulePathIgnorePatterns:["<rootDir>/dist/"],
    setupFilesAfterEnv: ["jest-extended"]
};


