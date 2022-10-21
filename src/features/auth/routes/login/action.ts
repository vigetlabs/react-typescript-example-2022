import { getAuthState, authService } from 'features/auth';
import { handleUnauthorizedError } from 'features/http';
import { ActionFunctionArgs, redirect } from 'react-router-dom';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const user = await authService.postLogin({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    getAuthState().signIn(user);
    return redirect(formData.get('redirect') as string);
  } catch (error) {
    return handleUnauthorizedError(error);
  }
}
