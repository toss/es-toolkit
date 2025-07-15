/** @type {import('jest').Config} */
module.exports = {
  moduleNameMapper: {
    '^vitest$': require.resolve('./jest.globals.js'),
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/compat/**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/compat/_internal'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
