import type { DefaultTokenizer, DefaultTokenizerConfig } from '@orama/orama';
import { normalizeToken } from '@orama/orama/internals';

const tokenizerLanguage = 'korean';
type TLanguage = typeof tokenizerLanguage;

type KoreanTokenizerConfig = DefaultTokenizerConfig & {
  language: TLanguage;
};

const defaultConfig: KoreanTokenizerConfig = {
  language: tokenizerLanguage,
};

const segmenter = new Intl.Segmenter('ko', { granularity: 'word' });

/* c8 ignore next 10 */
function trim(text: string[]): string[] {
  while (text[text.length - 1] === '') {
    text.pop();
  }
  while (text[0] === '') {
    text.shift();
  }
  return text;
}

function tokenize(text: string): string[] {
  const segments = segmenter.segment(text);
  const tokens: string[] = [];

  for (const segment of segments) {
    if (segment.isWordLike) {
      tokens.push(segment.segment);
    }
  }

  return tokens;
}

function tokenizeInternal(this: DefaultTokenizer, input: string, _language?: string, prop?: string): string[] {
  /* c8 ignore next 3 */
  if (typeof input !== 'string') {
    return [input];
  }

  let tokens: string[];

  if (prop && this?.tokenizeSkipProperties?.has(prop)) {
    // @ts-expect-error - TypeScript cannot infer the correct `this` context for the `normalizeToken` function.
    tokens = [this?.normalizeToken?.bind(this, prop ?? '')(input)];
  } else {
    tokens = tokenize(input);
  }

  const trimTokens = trim(tokens);

  if (!this.allowDuplicates) {
    return Array.from(new Set(trimTokens));
  }

  return trimTokens;
}

export function createTokenizer(config: KoreanTokenizerConfig = defaultConfig): DefaultTokenizer {
  const tokenizerConfig = {
    tokenize: tokenizeInternal,
    language: config.language,
    stemmerSkipProperties: new Set(config.stemmerSkipProperties ? [config.stemmerSkipProperties].flat() : []),
    tokenizeSkipProperties: new Set(config.tokenizeSkipProperties ? [config.tokenizeSkipProperties].flat() : []),
    stopWords: config.stopWords as string[] | undefined,
    allowDuplicates: Boolean(config.allowDuplicates),
    normalizeToken,
    normalizationCache: new Map(),
  };

  // @ts-expect-error - TypeScript cannot infer the correct `this` context for the `tokenizeInternal` function.
  tokenizerConfig.tokenize = tokenizeInternal.bind(tokenizeInternal);

  return tokenizerConfig;
}
