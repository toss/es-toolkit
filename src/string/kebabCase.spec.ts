import { describe, it, expect } from 'vitest';
import { kebabCase } from './kebabCase';

describe('kebabCase', () => {
  it('should change camel case to kebab case', async () => {
    expect(kebabCase('camelCase')).toEqual('camel-case');
  });

  it('should change space to dash', async () => {
    expect(kebabCase('some whitespace')).toEqual('some-whitespace');
  });

  it('should change hyphen to dash', async () => {
    expect(kebabCase('hyphen-text')).toEqual('hyphen-text');
  });

  it('should change Acronyms to small letter', async () => {
    expect(kebabCase('HTTPRequest')).toEqual('http-request');
  });

  it('should handle leading and trailing whitespace', async () => {
    expect(kebabCase('    leading and trailing whitespace')).toEqual('leading-and-trailing-whitespace');
  });

  it('should handle special characters correctly', async () => {
    expect(kebabCase('special@characters!')).toEqual('special-characters');
  });

  it('should handle strings that are already in snake_case', async () => {
    expect(kebabCase('snake_case')).toEqual('snake-case');
  });

  it('should work with an empty string', async () => {
    expect(kebabCase('')).toEqual('');
  });

  it('should work with an leading and trailing underscores', async () => {
    expect(kebabCase('__foo_bar___')).toEqual('foo-bar');
  });

  it('should work with screaming snake case', async () => {
    expect(kebabCase('FOO_BAR')).toEqual('foo-bar');
  });

  it('should work with capitalized words', async () => {
    expect(kebabCase('Foo Bar')).toEqual('foo-bar');
  });
});
