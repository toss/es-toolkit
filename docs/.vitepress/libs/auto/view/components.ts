import type { FunctionInfo } from '../model/getFunctionInfo';

export function CodeBlock(code: string, lang: string): string {
  return `\`\`\`${lang}\n${code}\n\`\`\``;
}

export function Title(title: string, level: 1 | 2 | 3 | 4): string {
  return `${'#'.repeat(level)} ${title}`;
}

export function List(items: string[]): string {
  return items.map(item => `- ${item}`).join('\n');
}

export function Container(...args: string[]): string {
  return args.join('\n\n').trim();
}

export function Head(title: string, description: string): string {
  return Container(Title(title, 1), description);
}

export function Signature(signature: string): string {
  return Container(Title('Signature', 2), CodeBlock(signature, 'typescript'));
}

export function Parameters(parameters: FunctionInfo['parameters']): string {
  const params = Object.entries(parameters);
  const formattedParams = params.map(([name, { type, description }]) => `\`${name}\` (\`${type}\`): ${description}`);

  return Container(Title('Parameters', 3), List(formattedParams));
}

export function Returns(returns: FunctionInfo['returns']): string {
  return Container(Title('Returns', 3), `\`(${returns.type})\`: ${returns.description}`);
}

export function Examples(examples: string[]): string {
  return Container(Title('Examples', 2), ...examples.map(example => CodeBlock(example, 'typescript')));
}
