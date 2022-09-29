/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig');

module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/.*',
    '!**/jest.config*',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
  coverageReporters: ['text', 'cobertura'],
  transform: {
    '.ts': 'ts-jest',
  },
  setupFiles: ['<rootDir>config.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      compiler: 'ttypescript',
      diagnostics: true,
    },
  },
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
      },
    ],
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};
