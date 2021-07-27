import React from 'react';
import { BlogSection, Features, Footer, Header, Hero, PopularItems } from '../components';

export function HomeScreen() {
  return (
    <>
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
