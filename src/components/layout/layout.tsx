import { FC } from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { Container } from '@/components/Container/Container';
import { ILayout } from './types';

const Layout: FC<ILayout> = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
