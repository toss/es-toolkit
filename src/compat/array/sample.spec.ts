import { describe, expect, expectTypeOf, it } from 'vitest';
import { sample } from 'es-toolkit/compat';
import { noop } from 'es-toolkit/compat';
import { values as valuesToolkit } from 'es-toolkit/compat';
import type { sample as sampleLodash } from 'lodash';
import { empties } from '../_internal/empties';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/sample.spec.js
 */

describe('sample', () => {
  const array = [1, 2, 3, 4, 5];

  it('should return a random element from an array', () => {
    const actual = sample(array);
    expect(array).toContain(actual);
  });

  it('should return `undefined` when sampling empty collections', () => {
    const expected = empties.map(noop);

    const actual = empties.map(value => {
      try {
        return sample(value);
      } catch (e) {
        return undefined;
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should sample an object', () => {
    const object = { a: 1, b: 2, c: 3 };
    const actual = sample(object);
    const values = valuesToolkit(object);

    expect(values).toContain(actual);
  });

  it('should sample a string', () => {
    const str = 'abc';
    const actual = sample(str);

    expect(['a', 'b', 'c']).toContain(actual);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(sample).toEqualTypeOf<typeof sampleLodash>();
  });
});
