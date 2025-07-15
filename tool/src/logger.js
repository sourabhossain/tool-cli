const chalk = require('chalk');

module.exports = function logger(namespace) {
    return {
        debug: (...args) => {
            console.info(chalk.gray(`[${namespace}]`), ...args);
        },
        warning: (...args) => {
            console.info(chalk.yellow(`[${namespace}]`), ...args);
        },
        error: (...args) => {
            console.info(chalk.red(`[${namespace}]`), ...args);
        },
        info: (...args) => {
            console.info(chalk.blue(`[${namespace}]`), ...args);
        }
    };
};
