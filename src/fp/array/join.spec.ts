import { describe, expect, it } from 'vitest';
import { join } from './join.ts';
import { pipe } from '../pipe.ts';

describe('join', () => {
  it('works in a pipe', () => {
    expect(pipe(['a', 'b', 'c'], join('-'))).toEqual('a-b-c');
  });
});
