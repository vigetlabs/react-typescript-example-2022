import { LoaderFunctionArgs } from 'react-router-dom';

export default async function loader({ params }: LoaderFunctionArgs) {
  return Promise.resolve();
}
