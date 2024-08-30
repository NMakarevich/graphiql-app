import { FC } from 'react';
import styles from './contributor.module.scss';
import { Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IContributorProps } from './types';

function getNameFromURL(url: string) {
  return new URL(url).pathname.slice(1);
}

const Contributor: FC<IContributorProps> = (
  props: IContributorProps
): JSX.Element => {
  const { contributor } = props;
  return (
    <Link
      sx={{ color: 'inherit' }}
      href={contributor.url}
      className={styles.Contributor}
      title={contributor.name}
    >
      <GitHubIcon />
      <Typography className={styles.ContributorName}>
        {getNameFromURL(contributor.url)}
      </Typography>
    </Link>
  );
};

export default Contributor;
