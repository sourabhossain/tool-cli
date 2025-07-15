# Tool CLI

A powerful CLI tool for development workflows with modern features like configuration management, build processes, and helpful feedback.

## Features

- 🚀 **Start Command**: Launch applications with configurable ports
- 🔨 **Build Command**: Build projects with minification support
- ⚙️ **Config Management**: Validate and manage configuration files
- 🎨 **Beautiful UI**: Colored output and spinners for better UX
- 🔍 **Debug Mode**: Enable detailed logging
- 📦 **Auto Updates**: Get notified of new versions
- ✅ **Validation**: JSON schema validation for configs
- 🐳 **Docker Support**: Run in containers with Node.js 22

## Installation

### Docker Installation (Recommended)

```bash
# Build the Docker image
docker build -t tool-cli .

# Run the CLI
docker run --rm tool-cli
```

### Local Development (Optional)

```bash
npm install -g .
```

### Development Setup

```bash
npm install
npm run bin
```

## Usage

### Basic Commands (Docker)

```bash
# Show help
docker run --rm tool-cli

# Show version
docker run --rm tool-cli --version

# Start the application
docker run --rm tool-cli tool start

# Build the application
docker run --rm tool-cli tool build

# Manage configuration
docker run --rm tool-cli tool config --show
```

### Basic Commands (Local)

```bash
# Show help
tool --help

# Show version
tool --version

# Start the application
tool start

# Build the application
tool build

# Manage configuration
tool config --show
```

### Start Command

```bash
# Start with default port (1234)
docker run --rm tool-cli tool start

# Start with custom port
docker run --rm tool-cli tool start --port 3000

# Start with debug mode
docker run --rm tool-cli tool start --debug

# Start with custom config file (mount local directory)
docker run --rm -v "$PWD":/app tool-cli tool start --config ./my-config.js

# Interactive mode for long-running processes
docker run --rm -it tool-cli tool start
```

### Build Command

```bash
# Build with default settings
docker run --rm tool-cli tool build

# Build with custom output directory (mount local directory)
docker run --rm -v "$PWD":/app tool-cli tool build --output ./build

# Build with minification
docker run --rm tool-cli tool build --minify

# Combine options (mount local directory)
docker run --rm -v "$PWD":/app tool-cli tool build --output ./dist --minify
```

### Configuration

The tool supports configuration files in multiple formats:

#### JavaScript (tool.config.js)

```javascript
module.exports = {
    port: 3000,
    host: 'localhost',
    debug: true,
    build: {
        output: 'dist',
        minify: true
    }
};
```

#### JSON (tool.config.json)

```json
{
    "port": 3000,
    "host": "localhost",
    "debug": true,
    "build": {
        "output": "dist",
        "minify": true
    }
}
```

### Docker Best Practices

```bash
# Always use --rm to clean up containers automatically
docker run --rm tool-cli

# Mount current directory for file operations
docker run --rm -v "$PWD":/app tool-cli tool build --output ./dist

# Use interactive mode for commands that need user input
docker run --rm -it tool-cli tool start

# Set custom container name for debugging
docker run --rm --name my-tool-container tool-cli tool build

# Use specific ports for services
docker run --rm -p 8080:8080 tool-cli tool start --port 8080
```

### Configuration Schema

| Property       | Type    | Default   | Description                         |
| -------------- | ------- | --------- | ----------------------------------- |
| `port`         | number  | 1234      | Port to run the server on (1-65535) |
| `host`         | string  | localhost | Host to bind to                     |
| `debug`        | boolean | false     | Enable debug mode                   |
| `build.output` | string  | dist      | Build output directory              |
| `build.minify` | boolean | false     | Enable minification                 |

## Development

### Scripts (Docker)

```bash
# Run the CLI
docker run --rm tool-cli

# Run tests
docker run --rm -v "$PWD":/app tool-cli sh -c "cd tool && npm test"

# Lint code
docker run --rm -v "$PWD":/app tool-cli sh -c "cd tool && npm run lint"

# Format code
docker run --rm -v "$PWD":/app tool-cli sh -c "cd tool && npm run format"

# Check formatting
docker run --rm -v "$PWD":/app tool-cli sh -c "cd tool && npm run format:check"
```

### Scripts (Local)

```bash
# Run the CLI
npm run bin

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

### Project Structure

```
tool/
├── bin/
│   └── index.js          # CLI entry point
├── src/
│   ├── commands/         # Command implementations
│   │   ├── start.js
│   │   ├── build.js
│   │   └── config-mgr.js
│   ├── config/           # Configuration schemas
│   │   └── schema.json
│   └── logger.js         # Logging utility
├── __tests__/            # Test files
├── package.json
└── README.md
```

### Docker Structure

```
tool-tutorial/
├── tool/                 # Main CLI project
├── testProject/          # Test project with config
├── Dockerfile            # Docker configuration
├── .dockerignore         # Docker ignore rules
└── run-all.sh           # Development scripts
```

### Adding New Commands

1. Create a new command file in `src/commands/`
2. Export an async function that handles the command logic
3. Add the command to `bin/index.js` using Commander.js
4. Add tests in `__tests__/`

Example command:

```javascript
// src/commands/new-command.js
const logger = require('../logger')('commands:new-command');

module.exports = async function newCommand(options) {
    logger.info('Running new command');
    // Command logic here
};
```

## Development

### Quick Start (Docker-First)

```bash
# Clone and setup
git clone <repository>
cd tool-tutorial

# Build Docker image
docker build -t tool-cli .

# Run tests in Docker
docker run --rm -v "$PWD":/app tool-cli sh -c "cd tool && npm test"

# Run linting in Docker
docker run --rm -v "$PWD":/app tool-cli sh -c "cd tool && npm run lint"

# Format code in Docker
docker run --rm -v "$PWD":/app tool-cli sh -c "cd tool && npm run format"

# Development with local files
docker run --rm -it -v "$PWD":/app tool-cli
```

### Local Development (Optional)

```bash
cd tool-tutorial/tool
npm install

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run `npm test` and `npm run lint`
6. Submit a pull request

## License

ISC
