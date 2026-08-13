import path from 'node:path';

// The webpack + Babel setup documented in docs/browser-support.md for
// supporting Chrome 80 / Safari 14.1.
//
// Note the `exclude`: es-toolkit ships modern syntax, so it must NOT be
// excluded from transpilation the way node_modules usually is. This fixture
// imports the built `dist` from a relative path, so a plain core-js exclude is
// enough; in a real app, scope your exclude so that es-toolkit stays included.
export default {
  mode: 'production',
  devtool: false,
  entry: path.resolve(import.meta.dirname, 'main.mjs'),
  output: {
    path: path.resolve(import.meta.dirname, '../../dist-fixtures/webpack'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /core-js/,
        resolve: {
          // Allow extensionless deep imports (e.g. core-js) from .mjs files.
          fullySpecified: false,
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { chrome: '80', safari: '14.1' },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
