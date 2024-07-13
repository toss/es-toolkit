export type SizedTuple<Length, Element, Result extends Element[] = []> = Result['length'] extends Length
  ? Result
  : SizedTuple<Length, Element, [Element, ...Result]>;
