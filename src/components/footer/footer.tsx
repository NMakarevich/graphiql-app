import { FC } from 'react';
import styles from './footer.module.scss';
import { Container } from '@components/Container/Container.tsx';
import { Link, Toolbar } from '@mui/material';
import Contributor from '@components/contributor/contributor.tsx';
import Image from 'next/image';

export interface IContributor {
  name: string;
  url: string;
}

const contributors: IContributor[] = [
  {
    name: 'Tatyana Antipova',
    url: 'https://github.com/L1senochek',
  },
  {
    name: 'Maxim Ravinskiy',
    url: 'https://github.com/GreyAdmiral',
  },
  {
    name: 'Nikolay Makarevich',
    url: 'https://github.com/NMakarevich',
  },
];

const Footer: FC = (): JSX.Element => {
  return (
    <footer className={styles.Footer}>
      <Container>
        <Toolbar color={'primary'} className={styles.Toolbar}>
          <div className={styles.Contributors}>
            {contributors.map((contributor, index) => (
              <Contributor key={index} contributor={contributor} />
            ))}
          </div>
          <div className={styles.Team}>2024</div>
          <div className={styles.Course}>
            <Link href={'https://rs.school/react/'}>
              <Image
                className={styles.Image}
                width={32}
                height={32}
                src={'/rss-logo.svg'}
                alt={'RSS Logo'}
                unoptimized
              />
            </Link>
          </div>
        </Toolbar>
      </Container>
    </footer>
  );
};

export default Footer;
