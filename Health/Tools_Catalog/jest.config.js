module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
   };