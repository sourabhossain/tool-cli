const logger = require('../logger')('commands:start');
const chalk = require('chalk');

module.exports = async function start(config) {
    const ora = await import('ora');
    const spinner = ora.default('Starting the application...').start();

    try {
        // Simulate some startup work
        await new Promise((resolve) => setTimeout(resolve, 1000));

        spinner.succeed(chalk.green('Application started successfully!'));

        logger.info('  Starting the app  ');
        logger.debug('Received configuration', config);

        console.info(chalk.cyan(`\n🚀 Server running on port ${config.port}`));
        console.info(chalk.gray('Press Ctrl+C to stop\n'));

        // Keep the process alive
        process.on('SIGINT', () => {
            console.info(chalk.yellow('\n👋 Shutting down gracefully...'));
            process.exit(0);
        });
    } catch (error) {
        spinner.fail(chalk.red('Failed to start application'));
        throw error;
    }
};
