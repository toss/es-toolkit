/**
 * Regular expression pattern to split strings into words for various case conversions
 *
 * This pattern matchs sequences of characters in a string, considering the following case:
 * - Sequences of two or more uppercase letters followed by an uppercase letter and lowercase letters or digits (for acronyms)
 * - Sequences of one uppercase letter optionally followed by lowercase letters and digits
 * - Single uppercase letters
 * - Sequences of digis
 *
 * The resulting match can be used to convert camelCase, snake_case, kebab-case, and other mixed formats into
 * a consistent format like snake case.
 *
 * @example
 * const matches = 'camelCaseHTTPRequest'.match(CASE_SPLIT_PATTERN);
 * // matchs: ['camel', 'Case', 'HTTP', 'Request']
 */
const CASE_SPLIT_PATTERN = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;

export function getWords<T extends string>(str: T): CaseSplit<T> {
  return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []) as CaseSplit<T>;
}

type UppercaseLetter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';
type LowercaseLetter = UppercaseLetter extends `${infer U}` ? Lowercase<U> : never;
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type EmptyStringFilter<L extends string[], S extends string> = S extends '' ? L : [...L, S];

export type CaseSplit<
  T extends string,
  B extends string = '',
  S extends string = '',
  L extends string[] = [],
> = T extends `${infer F}${infer R}`
  ? B extends ''
    ? F extends UppercaseLetter | LowercaseLetter | Digit
      ? CaseSplit<R, F, F, L>
      : CaseSplit<R, '', '', L>
    : B extends UppercaseLetter
      ? F extends UppercaseLetter
        ? R extends `${infer N}${string}`
          ? N extends LowercaseLetter
            ? CaseSplit<R, F, F, EmptyStringFilter<L, S>>
            : CaseSplit<R, F, `${S}${F}`, L>
          : CaseSplit<R, F, `${S}${F}`, L>
        : F extends LowercaseLetter
          ? CaseSplit<R, F, `${S}${F}`, L>
          : F extends Digit
            ? CaseSplit<R, F, F, EmptyStringFilter<L, S>>
            : CaseSplit<R, '', '', EmptyStringFilter<L, S>>
      : B extends LowercaseLetter
        ? F extends UppercaseLetter
          ? CaseSplit<R, F, F, EmptyStringFilter<L, S>>
          : F extends LowercaseLetter
            ? CaseSplit<R, F, `${S}${F}`, L>
            : F extends Digit
              ? CaseSplit<R, F, F, EmptyStringFilter<L, S>>
              : CaseSplit<R, '', '', EmptyStringFilter<L, S>>
        : B extends Digit
          ? F extends UppercaseLetter
            ? CaseSplit<R, F, F, EmptyStringFilter<L, S>>
            : F extends LowercaseLetter
              ? CaseSplit<R, F, F, EmptyStringFilter<L, S>>
              : F extends Digit
                ? CaseSplit<R, F, `${S}${F}`, L>
                : CaseSplit<R, '', '', EmptyStringFilter<L, S>>
          : CaseSplit<R, '', '', EmptyStringFilter<L, S>>
  : EmptyStringFilter<L, S>;
