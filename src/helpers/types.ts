export type WithChildren<T> = T & { children?: React.ReactNode };

export type WithRequiredChildren<T> = T & { children: React.ReactNode };

export interface AsProp<C extends React.ElementType> {
  as?: C;
}

export type PolyProps<C extends React.ElementType, P = unknown> = AsProp<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof AsProp<C>> &
  P;

/**
 * A helper type to allow for proper type inference of native browser
 * attributes on styled components with the `as` prop.
 *
 * @PERF(shawk): this has some performance implications for the TypeScript
 * compiler and should be replaced if emotion adds better TS support.
 */
export type PolyComponent<C extends React.ElementType, P = unknown> = <
  E extends React.ElementType = C,
>(
  props: PolyProps<E, P>,
) => JSX.Element | null;

export type ApiSuccess<T> = { success: true; data: T };

export type ApiFailure = {
  success: false;
  errors: {
    status: number;
    code: string;
    title: string;
    detail?: string;
  }[];
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
