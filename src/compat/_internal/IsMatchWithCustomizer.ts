export type IsMatchWithCustomizer = (
  value: any,
  other: any,
  indexOrKey: PropertyKey,
  object: object,
  source: object
) => boolean | undefined;
