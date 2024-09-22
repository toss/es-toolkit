export function isFinite(value: unknown): value is number {
  return Number.isFinite(value);
}
