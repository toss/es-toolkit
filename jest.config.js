/** @type {import('jest').Config} */
module.exports = {
  moduleNameMapper: {
    '^vitest$': require.resolve('./jest.globals.js'),
  },
};
