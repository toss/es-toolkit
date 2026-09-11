import { describe, expect, it } from 'vitest';
import { legacyWords } from './legacyWords';
import { words } from '../string/words';

describe('legacyWords', () => {
  // Inputs on which the ES5 fallback (lodash's patterns) and the default
  // Unicode-property pattern must agree, so engines without `\p{...}` support
  // (Node.js 6) get the same results as modern ones.
  const inputs = [
    '',
    'fred, barney, & pebbles',
    'fooBar',
    'foo_bar',
    'foo-bar',
    'foo bar baz',
    'FOO BAR',
    'ABCdef',
    'aeiouAreVowels',
    'LETTERSAeiouAreVowels',
    'safe HTML',
    'XMLHttpRequest',
    'YouTubeAPI',
    'enable 6h format',
    'enable 24H format',
    'too legit 2 quit',
    'walk 500 miles',
    'xhr2 request',
    'xhr2 REQUEST',
    'wow 1st 2nd 3rd 4th 11th 12th 13th 24th 30TH',
    "don't stop",
    "I'LL BE BACK",
    'they’re here',
    'café au lait',
    'ÄÖÜ äöü',
    'hello 😀 world',
    'foo📝bar',
  ];

  it.each(inputs)('splits %j like the default pattern', input => {
    expect(legacyWords(input)).toEqual(words(input));
  });

  it('keeps emoji sequences together like lodash', () => {
    // lodash treats skin-tone modifiers and regional indicator pairs as part
    // of the emoji; the default pattern currently splits them.
    expect(legacyWords('👍🏽 thumbs')).toEqual(['👍🏽', 'thumbs']);
    expect(legacyWords('🇰🇷 flag')).toEqual(['🇰🇷', 'flag']);
  });

  it('returns an empty array when nothing matches', () => {
    expect(legacyWords('')).toEqual([]);
    expect(legacyWords('   ')).toEqual([]);
  });
});
