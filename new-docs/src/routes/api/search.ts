import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';
import { createFileRoute } from '@tanstack/react-router';

const server = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});

export const Route = createFileRoute('/api/search')({
  server: {
    handlers: {
      GET: async ({ request }) => server.GET(request),
    },
  },
});
