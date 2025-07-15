// Mock console methods to avoid noise in tests
global.console = {
    ...console,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
};

// Mock process.exit to prevent tests from exiting
process.exit = jest.fn();
