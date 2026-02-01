import type { Route } from './+types/home';
import { useParams } from 'react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { HeroSection, FeaturesSection, Footer } from '@/components/home';
import { i18n } from '@/lib/i18n';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'es-toolkit' },
    { name: 'description', content: 'A blazing fast, lightweight JavaScript utility library.' },
  ];
}

export default function Home() {
  const { lang = i18n.defaultLanguage } = useParams();
  const langPrefix = lang === i18n.defaultLanguage ? '' : `/${lang}`;

  return (
    <HomeLayout {...baseOptions(lang)}>
      <HeroSection langPrefix={langPrefix} lang={lang} />
      <FeaturesSection lang={lang} />
      <Footer />
    </HomeLayout>
  );
}
