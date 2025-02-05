module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
    testMatch: [
        '**/e2e/**/*.test.ts',
        '**/tests/**/*.test.ts',
    ],
};