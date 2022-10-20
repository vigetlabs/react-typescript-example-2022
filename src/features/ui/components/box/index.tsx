import { Wrapper } from './styled';
import { Theme } from '@emotion/react';
import { Interpolation } from '@emotion/styled';

export type Props = {
  as?: React.ElementType;
  children?: React.ReactNode;
  gap?: number;
  vertical?: boolean;
  p?: number;
  pl?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  m?: number;
  ml?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  css?: Interpolation<Theme>;
  align?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
    | 'normal';
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'normal';
};

export function Box({ as = 'div', ...props }: Props) {
  return <Wrapper as={as} {...props} />;
}
