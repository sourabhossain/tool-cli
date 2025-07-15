// Mock cosmiconfig
const mockSearch = jest.fn();
const mockCosmiconfigSync = jest.fn(() => ({
    search: mockSearch
}));

jest.mock('cosmiconfig', () => ({
    cosmiconfigSync: mockCosmiconfigSync
}));

// Mock fs
const mockExistsSync = jest.fn();
const mockReadFileSync = jest.fn();

jest.mock('fs', () => ({
    existsSync: mockExistsSync,
    readFileSync: mockReadFileSync
}));

const getConfig = require('../src/commands/config-mgr');

describe('Config Manager', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return default config when no config file found', () => {
        mockSearch.mockReturnValue(null);

        const config = getConfig();
        expect(config).toEqual({ port: 1234 });
    });

    test('should load and validate config from file', () => {
        const mockConfig = { port: 3000 };
        mockSearch.mockReturnValue({ config: mockConfig });

        const config = getConfig();
        expect(config).toEqual(mockConfig);
    });

    test('should throw error for invalid config', () => {
        const invalidConfig = { port: 'invalid' };
        mockSearch.mockReturnValue({ config: invalidConfig });

        expect(() => getConfig()).toThrow('Configuration validation failed');
    });

    test('should load config from specified path', () => {
        mockExistsSync.mockReturnValue(true);
        mockReadFileSync.mockReturnValue('{"port": 5000}');

        const config = getConfig('/path/to/config.json');
        expect(config).toEqual({ port: 5000 });
    });

    test('should throw error for non-existent config file', () => {
        mockExistsSync.mockReturnValue(false);

        expect(() => getConfig('/path/to/nonexistent.json')).toThrow('Config file not found');
    });
});
