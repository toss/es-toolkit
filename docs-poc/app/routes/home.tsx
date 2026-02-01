import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { HeroSection, FeaturesSection, Footer } from '@/components/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'es-toolkit' },
    { name: 'description', content: 'A blazing fast, lightweight JavaScript utility library.' },
  ];
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </HomeLayout>
  );
}
