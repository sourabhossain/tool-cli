#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const logger = require('../src/logger')('bin');

// Check for updates
updateNotifier({ pkg }).notify();

const program = new Command();

program
    .name('tool')
    .description('A powerful CLI tool for development workflows')
    .version(pkg.version, '-v, --version')
    .option('-d, --debug', 'Enable debug mode')
    .option('-c, --config <path>', 'Specify config file path')
    .hook('preAction', (thisCommand) => {
        const options = thisCommand.opts();
        if (options.debug) {
            logger.debug('Debug mode enabled');
        }
    });

// Start command
program
    .command('start')
    .description('Start the application')
    .option('-p, --port <number>', 'Port to run on', '1234')
    .action(async (options) => {
        try {
            const start = require('../src/commands/start');
            const getConfig = require('../src/commands/config-mgr');

            const config = getConfig(options.config);

            if ((options.port && process.argv.includes('--port')) || process.argv.includes('-p')) {
                config.port = parseInt(options.port);
            }

            await start(config);
        } catch (error) {
            logger.error('Failed to start:', error.message);
            process.exit(1);
        }
    });

// Build command
program
    .command('build')
    .description('Build the application')
    .option('-o, --output <dir>', 'Output directory', 'dist')
    .option('--minify', 'Minify output')
    .action(async (options) => {
        try {
            const build = require('../src/commands/build');
            await build(options);
        } catch (error) {
            logger.error('Build failed:', error.message);
            process.exit(1);
        }
    });

// Config command
program
    .command('config')
    .description('Manage configuration')
    .option('--show', 'Show current configuration')
    .option('--validate', 'Validate configuration')
    .action(async (options) => {
        try {
            const configMgr = require('../src/commands/config-mgr');

            if (options.show) {
                const config = configMgr();
                console.info(chalk.cyan('Current configuration:'));
                console.info(JSON.stringify(config, null, 2));
            } else if (options.validate) {
                configMgr();
                console.info(chalk.green('✅ Configuration is valid'));
            } else {
                console.info(chalk.yellow('Use --show to display config or --validate to check config'));
            }
        } catch (error) {
            logger.error('Config error:', error.message);
            process.exit(1);
        }
    });

// Handle unknown commandsd
program.on('command:*', () => {
    console.error(chalk.red('Error: Unknown command'));
    console.info();
    program.help();
    process.exit(1);
});

// Global error handler
program.exitOverride();

try {
    program.parse();
} catch (err) {
    if (err.code === 'commander.help' || err.code === 'commander.version' || err.message === '(outputHelp)') {
        process.exit(0);
    }

    logger.error('Unexpected error:', err.message);
    process.exit(1);
}
