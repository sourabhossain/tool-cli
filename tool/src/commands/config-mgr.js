const logger = require('../logger')('config:mgr');
const { cosmiconfigSync } = require('cosmiconfig');
const schema = require('../config/schema.json');
const betterAjvErrors = require('better-ajv-errors').default;
const Ajv = require('ajv');
const path = require('path');
const fs = require('fs');

const ajv = new Ajv();
const configLoader = cosmiconfigSync('tool');

module.exports = function getConfig(configPath = null) {
    let result;

    if (configPath) {
        // Use specified config path
        const fullPath = path.resolve(configPath);
        if (!fs.existsSync(fullPath)) {
            throw new Error(`Config file not found: ${fullPath}`);
        }

        const ext = path.extname(fullPath);
        if (ext === '.js') {
            result = { config: require(fullPath) };
        } else if (ext === '.json') {
            result = { config: JSON.parse(fs.readFileSync(fullPath, 'utf8')) };
        } else {
            throw new Error(`Unsupported config file format: ${ext}`);
        }
    } else {
        // Search for config file
        result = configLoader.search(process.cwd());
    }

    if (!result) {
        logger.warning('Could not find configuration, using default');
        return { port: 1234 };
    }

    // Validate configuration
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
        logger.error('Invalid configuration was supplied');
        console.info();
        console.info(betterAjvErrors(schema, result.config, ajv.errors));
        throw new Error('Configuration validation failed');
    }

    logger.debug('Found configuration', result.config);
    return result.config;
};
