// eslint-disable-next-line no-misleading-character-class
const regexMultiByte = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/;

export function stringSize(str: string): number {
  return regexMultiByte.test(str) ? Array.from(str).length : str.length;
}

export function createPadding(length: number, chars: string): string {
  const charsLength = stringSize(chars);

  if (charsLength === 0 || length < 1) {
    return '';
  }

  const result = chars.repeat(Math.ceil(length / charsLength));

  return regexMultiByte.test(result) ? Array.from(result).slice(0, length).join('') : result.slice(0, length);
}
