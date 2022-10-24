export function asNumber(maybeNumber: unknown, fallback: number) {
  return isNaN(parseInt(maybeNumber as string, 10))
    ? fallback
    : Number(maybeNumber);
}
