import { IContributor } from '@/components/footer/types';

export const contributors: IContributor[] = [
  {
    name: 'Tatyana Antipova',
    url: 'https://github.com/L1senochek',
    role: 'Project Manager',
  },
  {
    name: 'Maxim Ravinskiy',
    url: 'https://github.com/GreyAdmiral',
    role: 'Layout Master',
  },
  {
    name: 'Nikolay Makarevich',
    url: 'https://github.com/NMakarevich',
    role: 'Team Lead',
  },
] as const;
