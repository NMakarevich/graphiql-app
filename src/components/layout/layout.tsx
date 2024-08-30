import { FC, ReactNode } from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { Container } from '@/components/Container/Container';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
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
