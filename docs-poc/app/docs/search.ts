import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';
import { createTokenizer as createJapaneseTokenizer } from '@orama/tokenizers/japanese';
import { createTokenizer as createMandarinTokenizer } from '@orama/tokenizers/mandarin';
import type { Route } from './+types/search';

const server = createFromSource(source, {
  localeMap: {
    // English - default
    en: {
      language: 'english',
    },
    // Korean - no official tokenizer, fallback to english
    ko: {
      language: 'english',
    },
    // Japanese - use Japanese tokenizer
    ja: {
      components: {
        tokenizer: createJapaneseTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
    // Chinese (Simplified) - use Mandarin tokenizer
    zh_hans: {
      components: {
        tokenizer: createMandarinTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
  },
});

export async function loader({ request }: Route.LoaderArgs) {
  return server.GET(request);
}
