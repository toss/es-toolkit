import { describe, expect, it } from 'vitest';
import playgroundDataLoader from './playground.data.mts';

describe('playground data', () => {
  it('inserts console.log after multiline variable declarations', () => {
    const data = playgroundDataLoader.load();
    const code = data.examples['map/countBy'];

    expect(code).toContain(`const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 1],
]);
console.log('map:', map);`);
  });

  it('ignores semicolons inside multiline variable declarations', () => {
    const data = playgroundDataLoader.load();
    const code = data.examples['array/flatMapAsync'];

    expect(code).toContain(`const allPosts = await flatMapAsync(users, async user => {
  return await fetchUserPosts(user.id);
});
console.log('allPosts:', allPosts);`);
  });
});
