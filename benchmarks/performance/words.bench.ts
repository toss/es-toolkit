import { bench, describe } from 'vitest';
import { words as wordsToolkit } from 'es-toolkit';
import { words as wordsToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { words: wordLodash } = lodash;

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
