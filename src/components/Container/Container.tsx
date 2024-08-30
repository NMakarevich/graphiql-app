import { FC } from 'react';
import type { PropsWithChildren } from 'react';

interface ContainerProps {
  className?: string;
}

export const Container: FC<PropsWithChildren & ContainerProps> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <div className={className ? `${className}_container` : 'container'}>
      {children}
    </div>
  );
};
