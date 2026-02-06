import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route(':lang', 'routes/home.tsx', { id: 'home-lang' }),
  route(':lang/docs/*', 'docs/page.tsx', { id: 'docs-lang' }),
  route('docs/*', 'docs/page.tsx', { id: 'docs-default' }),
  route('api/search', 'docs/search.ts'),
  route('llms.txt', 'llms/llms.ts'),
  route('llms-full.txt', 'llms/llms-full.ts'),
] satisfies RouteConfig;
