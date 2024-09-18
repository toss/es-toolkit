function fixExpectFunction(source: string): string {
  const expectMatched = source.match(/expect(\(.+\)).toEqual.+\);/g);

  if (!expectMatched) {
    return source;
  }

  const splitMatched = expectMatched.map(match => match.split('.toEqual('));
  const brokenSyntax = splitMatched.map(([expect]) => {
    let count = 0;

    for (const char of expect) {
      if (['(', '{', '['].includes(char)) {
        count++;
      } else if ([')', '}', ']'].includes(char)) {
        count--;
      }
    }

    return count > 0;
  });

  for (let i = 0; i < expectMatched.length; i++) {
    if (brokenSyntax[i]) {
      const front = splitMatched[i][0];
      const startWithBracket = front.match(/expect\([{[].+[}\]],/);
      const startWithFunction = front.match(/expect\(.+\(.+\),/);

      const start = startWithFunction
        ? startWithFunction[0].length
        : startWithBracket
          ? startWithBracket[0].length
          : front.indexOf(',') + 1;
      const fixed = `${front.slice(0, start)}).toEqual(${front.slice(start, front.length - 1)}, ${splitMatched[i][1]}`;

      source = source.replace(expectMatched[i], fixed);
    }
  }

  return source;
}

export function formatBrokenSyntax(source: string): string {
  // Fix broken syntax
  source = fixExpectFunction(source);

  // `delete localvariable` to comment
  source = source.replace(
    /delete [^.[\]]+;/g,
    match => `// Deleting local variable in strict mode. So commenting it out.\n// ${match}`
  );

  return source;
}
