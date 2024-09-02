import type { Parsed } from './parse';

function CodeBlock(code: string, lang: string): string {
  return `\`\`\`${lang}\n${code}\n\`\`\``;
}

function Title(title: string, level: 1 | 2 | 3 | 4): string {
  return `${'#'.repeat(level)} ${title}`;
}

function List(items: string[]): string {
  return items.map(item => `- ${item}`).join('\n');
}

function Container(...args: string[]): string {
  return args.join('\n\n');
}

function formatParameters(parameters: Parsed['parameters']): string[] {
  return Object.entries(parameters).map(([name, { type, description }]) => `\`${name}\` (\`${type}\`): ${description}`);
}

function formatReturns(returns: Parsed['returns']): string {
  return `(\`${returns.type}\`): ${returns.description}`;
}

export function createContent(name: string, parsed: Parsed[]): string {
  return Container(
    Title(name, 1),
    ...parsed.map(parsed =>
      Container(
        parsed.description,
        Title('Signature', 2),
        CodeBlock(parsed.signature, 'typescript'),
        Title('Parameters', 3),
        List(formatParameters(parsed.parameters)),
        Title('Returns', 3),
        formatReturns(parsed.returns),
        Title('Examples', 2),
        ...parsed.examples.map(example => CodeBlock(example, 'typescript'))
      )
    )
  );
}
