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
type LowercaseLetter = Lowercase<UppercaseLetter>;
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type EmptyStringFilter<L extends string[], S extends string> = S extends '' ? L : [...L, S];

/**
 * The CaseSplit type takes an `InputString` and splits it into an array of substrings based on the following regular expression pattern:
 *
 * `/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g`
 *
 * @template InputString - The string to be split into substrings.
 * @template LastCharacter - The last processed character (used internally for recursion).
 * @template SubString - The current substring being built (used internally for recursion).
 * @template Result - The accumulated result array of substrings (used internally for recursion).
 */
export type CaseSplit<
  InputString extends string,
  LastCharacter extends string = '',
  SubString extends string = '',
  Result extends string[] = [],
> = string extends InputString
  ? string[]
  : InputString extends `${infer FirstCharacter}${infer RestString}`
    ? LastCharacter extends ''
      ? LastLetterIsEmpty<FirstCharacter, RestString, Result>
      : LastCharacter extends UppercaseLetter
        ? LastLetterIsUppercase<FirstCharacter, RestString, SubString, Result>
        : LastCharacter extends LowercaseLetter
          ? LastLetterIsLowercase<FirstCharacter, RestString, SubString, Result>
          : LastCharacter extends Digit
            ? LastLetterIsDigit<FirstCharacter, RestString, SubString, Result>
            : CaseSplit<RestString, '', '', EmptyStringFilter<Result, SubString>>
    : EmptyStringFilter<Result, SubString>;
/**
 * Condition: The last processed character `LastCharacter` is an empty string (initial condition or after a non-alphanumeric character):
 * - If `FirstCharacter` is an alphanumeric character, it starts a new substring with `FirstCharacter` as `LastCharacter` and `SubString`.
 * - Else, it starts a new substring with `''` as `LastCharacter` and `SubString`.
 */
type LastLetterIsEmpty<
  FirstCharacter extends string,
  RestString extends string,
  Result extends string[],
> = FirstCharacter extends UppercaseLetter | LowercaseLetter | Digit
  ? CaseSplit<RestString, FirstCharacter, FirstCharacter, Result>
  : CaseSplit<RestString, '', '', Result>;
/**
 * Condition: The last processed character `LastCharacter` is an uppercase letter:
 * - If `FirstCharacter` is an uppercase letter, it either continues with the current substring or starts a new one if a lowercase letter follows.
 * - If `FirstCharacter` is a lowercase letter, it appends to the current substring
 * - If `FirstCharacter` is a digit, it starts a new substring with `FirstCharacter` as `LastCharacter` and `SubString`.
 * - Else, it starts a new substring with `''` as `LastCharacter` and `SubString`.
 */
type LastLetterIsUppercase<
  FirstCharacter extends string,
  RestString extends string,
  SubString extends string,
  Result extends string[],
> = FirstCharacter extends UppercaseLetter
  ? RestString extends `${infer SecondCharacter}${string}`
    ? SecondCharacter extends LowercaseLetter
      ? StartNewSubstring<FirstCharacter, RestString, SubString, Result>
      : AppendToSubstring<FirstCharacter, RestString, SubString, Result>
    : AppendToSubstring<FirstCharacter, RestString, SubString, Result>
  : FirstCharacter extends LowercaseLetter
    ? AppendToSubstring<FirstCharacter, RestString, SubString, Result>
    : FirstCharacter extends Digit
      ? StartNewSubstring<FirstCharacter, RestString, SubString, Result>
      : StartNewSubstring<'', RestString, SubString, Result>;

/**
 * Condition: The last processed character `LastCharacter` is a lowercase letter:
 * - If `FirstCharacter` is an uppercase letter, it starts a new substring.
 * - If `FirstCharacter` is a lowercase letter, it appends to the current substring
 * - If `FirstCharacter` is a digit, it starts a new substring with `FirstCharacter` as `LastCharacter` and `SubString`.
 * - Else, it starts a new substring with `''` as `LastCharacter` and `SubString`.
 */
type LastLetterIsLowercase<
  FirstCharacter extends string,
  RestString extends string,
  SubString extends string,
  Result extends string[],
> = FirstCharacter extends UppercaseLetter
  ? StartNewSubstring<FirstCharacter, RestString, SubString, Result>
  : FirstCharacter extends LowercaseLetter
    ? AppendToSubstring<FirstCharacter, RestString, SubString, Result>
    : FirstCharacter extends Digit
      ? StartNewSubstring<FirstCharacter, RestString, SubString, Result>
      : StartNewSubstring<'', RestString, SubString, Result>;

/**
 * Condition: The last processed character `LastCharacter` is a digit:
 * - If `FirstCharacter` is an uppercase letter, it starts a new substring.
 * - If `FirstCharacter` is a lowercase letter, it starts a new substring.
 * - If `FirstCharacter` is a digit, it appends to the current substring with `FirstCharacter` as `LastCharacter` and `SubString`.
 * - Else, it starts a new substring with `''` as `LastCharacter` and `SubString`.
 */
type LastLetterIsDigit<
  FirstCharacter extends string,
  RestString extends string,
  SubString extends string,
  Result extends string[],
> = FirstCharacter extends UppercaseLetter
  ? StartNewSubstring<FirstCharacter, RestString, SubString, Result>
  : FirstCharacter extends LowercaseLetter
    ? StartNewSubstring<FirstCharacter, RestString, SubString, Result>
    : FirstCharacter extends Digit
      ? AppendToSubstring<FirstCharacter, RestString, SubString, Result>
      : StartNewSubstring<'', RestString, SubString, Result>;
/**
 * Append the `SubString` to the `Result` array and start a new substring with `FirstCharacter`.
 */
type StartNewSubstring<
  FirstCharacter extends string,
  RestString extends string,
  SubString extends string,
  Result extends string[],
> = CaseSplit<RestString, FirstCharacter, FirstCharacter, EmptyStringFilter<Result, SubString>>;
/**
 * Append the `FirstCharacter` to the `SubString` and continue processing the `RestString`.
 */
type AppendToSubstring<
  FirstCharacter extends string,
  RestString extends string,
  SubString extends string,
  Result extends string[],
> = CaseSplit<RestString, FirstCharacter, `${SubString}${FirstCharacter}`, Result>;
