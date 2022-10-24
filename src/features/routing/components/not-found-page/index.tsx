import { Box, Heading, Paragraph } from 'features/ui';

export function NotFoundPage() {
  return (
    <Box p={4} vertical align="center">
      <Heading>Whoops!</Heading>
      <Paragraph>That page is in another theatre.</Paragraph>
    </Box>
  );
}
