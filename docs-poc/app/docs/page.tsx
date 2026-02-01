import type { Route } from './+types/page';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { source } from '@/lib/source';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import browserCollections from 'fumadocs-mdx:collections/browser';
import { baseOptions } from '@/lib/layout.shared';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { i18n } from '@/lib/i18n';

export async function loader({ params }: Route.LoaderArgs) {
  const lang = params.lang ?? i18n.defaultLanguage;
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  const page = source.getPage(slugs, lang);
  if (!page) throw new Response('Not found', { status: 404 });

  return {
    path: page.path,
    pageTree: await source.serializePageTree(source.getPageTree(lang)),
    lang,
  };
}

const clientLoader = browserCollections.docs.createClientLoader({
  component(
    { toc, frontmatter, default: Mdx },
    // you can define props for the `<Content />` component
    props?: {
      className?: string;
    },
  ) {
    return (
      <DocsPage toc={toc} {...props}>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <Mdx components={{ ...defaultMdxComponents }} />
        </DocsBody>
      </DocsPage>
    );
  },
});

export default function Page({ loaderData }: Route.ComponentProps) {
  const { path, pageTree, lang } = useFumadocsLoader(loaderData);

  return (
    <DocsLayout {...baseOptions(lang)} tree={pageTree}>
      {clientLoader.useContent(path)}
    </DocsLayout>
  );
}
