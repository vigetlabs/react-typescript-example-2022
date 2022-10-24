// https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    '--bg'?: string;
  }
}
