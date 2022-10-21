import { Box, Props as BoxProps } from '../box';
import styled from '@emotion/styled';

const Wrapper = styled(Box)<Props>(({ templateColumns, templateRows }) => ({
  display: 'grid',
  gridTemplateColumns: templateColumns,
  gridTemplateRows: templateRows,
}));

type Props = BoxProps & {
  templateColumns?: string;
  templateRows?: string;
};

export function Grid({ ...props }: Props) {
  return <Wrapper {...props} />;
}
