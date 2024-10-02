export function eq(value: unknown, other: unknown): boolean {
  return value === other || (Number.isNaN(value) && Number.isNaN(other));
}
