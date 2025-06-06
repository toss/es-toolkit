import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/transform.ts',
  output: [
    {
      file: 'dist/transform.js',
      format: 'cjs',
      exports: 'default',
    },
    {
      file: 'dist/transform.mjs',
      format: 'es',
    },
  ],
  external: ['jscodeshift'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      clean: true,
    }),
  ],
};
