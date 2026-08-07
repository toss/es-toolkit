# isURL

Checks if the given value is a valid URL string.

Uses JavaScript's built-in URL constructor to validate the URL.
A valid URL format must include a protocol (http, https, etc.).

When checking relative URLs, you can provide a base URL as the second parameter.

Can be used as a TypeScript type guard. Narrows the parameter type to `string`.

## Interface

```typescript
function isURL(value: unknown, base?: string): value is string;
```

### Parameters

- `value`(`unknown`): The value to check for URL validity.
- `base`(`string`, optional): The base URL to use if `value` is a relative URL.

### Return Value

(`value is string`): `true` if the value is a valid URL, otherwise `false`.

## Examples

```typescript
isURL('https://example.com'); // true
isURL('http://localhost:3000'); // true
isURL('https://example.com/path?query=123#hash'); // true
isURL('ftp://ftp.example.com'); // true
isURL('ws://websocket.example.com'); // true
isURL('file:///path/to/file'); // true

// Using base URL parameter
isURL('/products', 'https://example.com'); // true
isURL('about', 'https://example.com/'); // true
isURL('category/shoes', 'https://shop.example.com'); // true
isURL('#section', 'https://example.com/page'); // true
isURL('?query=value', 'https://example.com/page'); // true

isURL('example.com'); // false (no protocol)
isURL('not a url'); // false
isURL(''); // false
isURL('http://'); // false

// Invalid relative URLs even with base URL
isURL('', 'https://example.com'); // false
isURL('not a url', 'https://example.com'); // false
isURL('!#$%@#!#@', 'https://example.com'); // false

isURL(123); // false
isURL(null); // false
isURL(undefined); // false
```
