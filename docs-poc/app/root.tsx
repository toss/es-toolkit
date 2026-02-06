import { ReactRouterProvider } from 'fumadocs-core/framework/react-router';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { RootProvider } from 'fumadocs-ui/provider/base';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useParams } from 'react-router';
import type { Route } from './+types/root';
import './app.css';
import { i18n } from './lib/i18n';

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    ko: {
      displayName: '한국어',
      search: '문서 검색',
      searchNoResult: '검색 결과가 없습니다',
      toc: '목차',
      tocNoHeadings: '목차 없음',
      chooseLanguage: '언어 선택',
      nextPage: '다음',
      previousPage: '이전',
      chooseTheme: '테마 선택',
      editOnGithub: 'GitHub에서 수정',
    },
    ja: {
      displayName: '日本語',
      search: 'ドキュメントを検索',
      searchNoResult: '結果が見つかりません',
      toc: '目次',
      tocNoHeadings: '見出しなし',
      chooseLanguage: '言語を選択',
      nextPage: '次へ',
      previousPage: '前へ',
      chooseTheme: 'テーマを選択',
      editOnGithub: 'GitHubで編集',
    },
    zh_hans: {
      displayName: '简体中文',
      search: '搜索文档',
      searchNoResult: '没有找到结果',
      toc: '目录',
      tocNoHeadings: '无标题',
      chooseLanguage: '选择语言',
      nextPage: '下一页',
      previousPage: '上一页',
      chooseTheme: '选择主题',
      editOnGithub: '在 GitHub 上编辑',
    },
  },
});

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'icon', href: '/favicon.png', type: 'image/png', sizes: '96x96' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
];

export const meta: Route.MetaFunction = () => [
  { title: 'es-toolkit · A modern JavaScript utility library' },
  {
    name: 'description',
    content:
      'A state-of-the-art, high-performance JavaScript utility library with a small bundle size and strong type annotations.',
  },
  {
    name: 'keywords',
    content: 'es-toolkit, javascript, typescript, utility, lodash, performance, bundle-size',
  },
  // Open Graph
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'es-toolkit · A modern JavaScript utility library' },
  {
    property: 'og:description',
    content:
      'A state-of-the-art, high-performance JavaScript utility library with a small bundle size and strong type annotations.',
  },
  { property: 'og:image', content: '/og.png' },
  { property: 'og:site_name', content: 'es-toolkit' },
  // Twitter Card
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'es-toolkit · A modern JavaScript utility library' },
  {
    name: 'twitter:description',
    content:
      'A state-of-the-art, high-performance JavaScript utility library with a small bundle size and strong type annotations.',
  },
  { name: 'twitter:image', content: '/og.png' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang = i18n.defaultLanguage } = useParams();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <ReactRouterProvider>
          <RootProvider i18n={provider(lang)}>{children}</RootProvider>
        </ReactRouterProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 w-full max-w-[1400px] mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
