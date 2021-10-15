import React from 'react';
import { BlogSection, Features, Footer, Header, Hero, PopularItems, Meta } from '../components';

export function HomeScreen() {
  return (
    <>
      <Meta title="Welcome to Lux House | Home" />
      <Header />
      <main>
        <Hero />
        <Features />
        <PopularItems />
        <BlogSection />
      </main>

      <Footer />
    </>
  );
}
