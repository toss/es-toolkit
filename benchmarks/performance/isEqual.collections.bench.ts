import { bench, describe } from 'vitest';
import { isEqual } from 'es-toolkit';

const entries = Array.from({ length: 10_000 }, (_, index) => [index, index] as const);
const objectEntries = entries.map(([index]) => [{ index }, index] as const);
const map = new Map(entries);
const sameOrderMap = new Map(entries);
const reversedMap = new Map([...entries].reverse());
const objectMap = new Map(objectEntries);
const reversedObjectMap = new Map([...objectEntries].reverse());
const set = new Set(entries.map(([index]) => index));
const reversedSet = new Set([...set].reverse());

describe('isEqual collections with 10,000 entries', () => {
  bench('maps with primitive keys in the same order', () => isEqual(map, sameOrderMap));
  bench('maps with primitive keys in reverse order', () => isEqual(map, reversedMap));
  bench('maps with shared object keys in reverse order', () => isEqual(objectMap, reversedObjectMap));
  bench('sets with primitive members in reverse order', () => isEqual(set, reversedSet));
});
