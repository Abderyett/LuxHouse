import React from 'react';
import styled from 'styled-components';
import { BlogSection, Features, Footer, Header, Hero, PopularItems, Meta } from '../components';

export function HomeScreen() {
  return (
    <>
      <Meta title="Welcome to Lux House | Home" />
      <Header />
      <Main>
        <Hero />
        <Features />
        <PopularItems />
        <BlogSection />
      </Main>

      <Footer />
    </>
  );
}

const Main = styled.main`
  margin-top: 4.5rem;
`;
