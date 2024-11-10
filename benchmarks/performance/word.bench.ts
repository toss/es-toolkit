import { bench, describe, expect, it } from 'vitest';
import { words as wordsToolkit } from 'es-toolkit';
import { words as wordLodash_ } from 'lodash';

describe('Performance Comparison: es-toolkit words vs lodash words', () => {
  const testString = 'This is a test string with different_cases and UPPERCASE words 🚀 and more symbols';

  bench('es-toolkit words', () => {
    wordsToolkit(testString);
  });

  bench('lodash words', () => {
    wordLodash_(testString);
  });
});
