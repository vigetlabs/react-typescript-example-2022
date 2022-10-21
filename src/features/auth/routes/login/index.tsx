import { useAuthStore } from '../../store';
import { urls } from 'features/routing/urls';
import {
  Box,
  Button,
  ErrorMessages,
  Grid,
  Heading,
  Paragraph,
} from 'features/ui';
import { ApiFailure } from 'helpers/types';
import { useState } from 'react';
import {
  Form,
  Navigate,
  useActionData,
  useLocation,
  useNavigation,
} from 'react-router-dom';

export default function LoginPage() {
  const auth = useAuthStore();
  const location = useLocation();
  const navigation = useNavigation();
  const [redirectTo] = useState(location.state?.from?.pathname || urls.root);
  const result = useActionData() as ApiFailure | undefined;

  const isSubmitting = navigation.state === 'submitting';
  const isNavigationPending = navigation.state === 'loading';

  if (auth.isAuthenticated && navigation.state === 'idle') {
    return <Navigate to={redirectTo} replace />;
  }

  function getSubmitButtonText() {
    if (auth.isAuthenticated && isNavigationPending) {
      return 'Success!';
    }

    if (isSubmitting) {
      return 'Loading...';
    }

    return 'Log In';
  }

  return (
    <Box p={4} gap={4} vertical>
      <Heading>Log In</Heading>

      {result?.errors && !isSubmitting && !isNavigationPending ? (
        <ErrorMessages errors={result.errors} />
      ) : null}

      <Form method="post">
        <Grid
          gap={4}
          pb={4}
          templateColumns="max-content minmax(150px, 1fr)"
          css={{
            maxWidth: 300,
          }}
        >
          <input name="redirect" type="hidden" value={redirectTo} />

          <Paragraph as="label" htmlFor="email">
            Email
          </Paragraph>

          <input
            id="email"
            type="email"
            name="email"
            defaultValue="bb@taz.com"
            disabled={isSubmitting}
          />

          <Paragraph as="label" htmlFor="password">
            Password
          </Paragraph>

          <input
            id="password"
            type="password"
            name="password"
            defaultValue="abc"
            disabled={isSubmitting}
          />
        </Grid>

        <Button type="submit" disabled={isSubmitting || isNavigationPending}>
          {getSubmitButtonText()}
        </Button>
      </Form>
    </Box>
  );
}
