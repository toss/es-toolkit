export function isLength(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) >= 0;
}
