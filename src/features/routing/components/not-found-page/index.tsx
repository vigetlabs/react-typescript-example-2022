import illustration from '../../../../assets/images/movie-illustration-1.png';
import { Box, Heading, Paragraph } from 'features/ui';

export function NotFoundPage() {
  return (
    <Box p={8} gap={4} vertical align="center">
      <Heading>Whoops...</Heading>
      <Paragraph>That page is in another theatre.</Paragraph>

      <img
        src={illustration}
        alt=""
        css={{
          display: 'block',
          width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '30rem',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
}
