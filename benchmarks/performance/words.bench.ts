import { bench, describe } from 'vitest';
import { words as wordsToolkit_ } from 'es-toolkit';
import { words as wordsToolkitCompat_ } from 'es-toolkit/compat';
import { words as wordLodash_ } from 'lodash';

const wordsToolkit = wordsToolkit_;
const wordsToolkitCompat = wordsToolkitCompat_;
const wordLodash = wordLodash_;

describe('Performance Comparison: es-toolkit words vs lodash words', () => {
  const testString = 'This is a test string with different_cases and UPPERCASE words 🚀 and more symbols';

  bench('es-toolkit words', () => {
    wordsToolkit(testString);
  });

  bench('es-toolkit/compat words', () => {
    wordsToolkitCompat(testString);
  });

  bench('lodash words', () => {
    wordLodash(testString);
  });
});
