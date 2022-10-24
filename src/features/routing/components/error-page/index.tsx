import { ForbiddenError, UnauthorizedError } from 'features/http';
import { Box, Heading, Paragraph } from 'features/ui';
import React from 'react';
import { useRouteError } from 'react-router-dom';

export function ErrorPage({
  layout: Layout,
}: {
  layout: React.ComponentType<{ children?: React.ReactNode }>;
}) {
  const error = useRouteError();

  let content = <UnexpectedErrorPage />;

  if (error instanceof UnauthorizedError) {
    content = <UnauthorizedErrorPage />;
  } else if (error instanceof ForbiddenError) {
    content = <ForbiddenErrorPage />;
  }

  return <Layout>{content}</Layout>;
}

function UnauthorizedErrorPage() {
  return (
    <Box p={4} vertical>
      <Heading>Unauthorized</Heading>
      <Paragraph>You need to be logged in to do that.</Paragraph>
    </Box>
  );
}

function ForbiddenErrorPage() {
  return (
    <Box p={4} vertical>
      <Heading>Permission Denied</Heading>
      <Paragraph>You aren’t authorized to do that.</Paragraph>
    </Box>
  );
}

function UnexpectedErrorPage() {
  return (
    <Box p={4} vertical>
      <Heading>Oops!</Heading>
      <Paragraph>Something went wrong.</Paragraph>
    </Box>
  );
}
