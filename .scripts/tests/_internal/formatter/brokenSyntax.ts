export function formatBrokenSyntax(source: string): string {
  // Fix broken syntax
  const brokenMatched = source.match(/(?<=,)[\s\d\w?]+\[.+\).toEqual\((?!\[).+\]\);/g);
  if (brokenMatched != null) {
    for (const match of brokenMatched) {
      const splited = match.split(').toEqual(');
      const formatted = `).toEqual(${splited.join(', ')}`;
      source = source.replace(match, formatted);
    }
  }

  // Remove deleting local variable
  const deleteMatched = source.match(/delete [\w\d]+;/g);
  if (deleteMatched != null) {
    for (const match of deleteMatched) {
      source = source.replace(match, '');
    }
  }

  return source;
}
