# split

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Splits a string by a separator.

## Signature

```typescript
function split(string: string): string[];
function split(string: string, separator: RegExp | string): string[];
function split(string: string, separator: RegExp | string, limit: number): string[];
```

## Parameters

- `string` (`string`): The string to split.
- `separator` (`RegExp|string`): The separator pattern to split by.
- `limit` (`number`): The length to truncate results to.

## Returns

- (`Array`): Returns the string segments.

## Examples

```js
// Split a string by a character
split('a-b-c', '-');
// => ['a', 'b', 'c']

// Split a string with a limit
split('a-b-c', '-', 2);
// => ['a', 'b']

// Split a string by a regex pattern
split('abcde', /[bd]/);
// => ['a', 'c', 'e']

// Split a string into individual characters
split('abc', '');
// => ['a', 'b', 'c']
```
