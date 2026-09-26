import { bench, describe } from 'vitest';
import { stringifySearch as stringifySearchToolkit } from 'es-toolkit/util';

type QueryValue = string | number | boolean | bigint | null | undefined;

function stringifySearchWithURLSearchParams(query: Record<string, QueryValue | readonly QueryValue[]>): string {
  const params = new URLSearchParams();
  const keys = Object.keys(query);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = query[key];
    const values: readonly QueryValue[] = Array.isArray(value) ? value : [value];

    for (let j = 0; j < values.length; j++) {
      const item = values[j];

      if (item != null) {
        params.append(key, String(item));
      }
    }
  }

  const search = params.toString().replace(/\+/g, '%20');

  return search === '' ? '' : `?${search}`;
}

const smallQuery = { page: 1, q: 'hello world', ref: undefined };

const arrayQuery = { tags: ['typescript', 'javascript', 'node'], ids: [1, 2, 3, null], sort: 'desc' };

const largeQuery: Record<string, string | number> = {};
for (let i = 0; i < 50; i++) {
  largeQuery[`key${i}`] = i % 2 === 0 ? `value ${i}` : i;
}

describe('stringifySearch: small query', () => {
  bench('es-toolkit/stringifySearch', () => {
    stringifySearchToolkit(smallQuery);
  });

  bench('URLSearchParams', () => {
    stringifySearchWithURLSearchParams(smallQuery);
  });
});

describe('stringifySearch: arrays', () => {
  bench('es-toolkit/stringifySearch', () => {
    stringifySearchToolkit(arrayQuery);
  });

  bench('URLSearchParams', () => {
    stringifySearchWithURLSearchParams(arrayQuery);
  });
});

describe('stringifySearch: 50 keys', () => {
  bench('es-toolkit/stringifySearch', () => {
    stringifySearchToolkit(largeQuery);
  });

  bench('URLSearchParams', () => {
    stringifySearchWithURLSearchParams(largeQuery);
  });
});
