/** @type {import('jest').Config} */
module.exports = {
  moduleNameMapper: {
    '^vitest$': require.resolve('./jest.globals.js'),
  },
  testMatch: ['<rootDir>/src/compat/**/*.spec.ts'],
};
