import { Props } from '.';
import styled from '@emotion/styled';

export const Wrapper = styled('div')<Props>(
  ({
    theme,
    gap = 0,
    p,
    pl,
    pt,
    pr,
    pb,
    m,
    ml,
    mt,
    mr,
    mb,
    vertical = false,
    align = 'normal',
    justify = 'normal',
  }) => ({
    display: 'flex',
    flexDirection: vertical ? 'column' : 'row',
    gap: gap && theme.spacing(gap),
    padding: p && theme.spacing(p),
    paddingLeft: pl && theme.spacing(pl),
    paddingTop: pt && theme.spacing(pt),
    paddingRight: pr && theme.spacing(pr),
    paddingBottom: pb && theme.spacing(pb),
    margin: m && theme.spacing(m),
    marginLeft: ml && theme.spacing(ml),
    marginTop: mt && theme.spacing(mt),
    marginRight: mr && theme.spacing(mr),
    marginBottom: mb && theme.spacing(mb),
    alignItems: align,
    justifyContent: justify,
  }),
);
