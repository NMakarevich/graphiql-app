import { FC } from 'react';
import type { PropsWithChildren } from 'react';
import { IContainerProps } from './types';

export const Container: FC<PropsWithChildren & IContainerProps> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <div className={className ? `${className}_container` : 'container'}>
      {children}
    </div>
  );
};
