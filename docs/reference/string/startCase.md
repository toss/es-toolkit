# startCase

Converts a string to start case.

Start case is a naming convention where the first letter of each word in an identifier is written in uppercase and the rest of the letters are in lowercase, with the words separated by spaces, such as `Start Case`.

## Signature

```typescript
function startCase(str: string): string;
```

### Parameters

- `str` (`string`): The string to convert to start case.

### Returns

(`string`) The string converted to start case.

## Examples

```typescript
import { startCase } from 'es-toolkit/string';

startCase('--foo-bar--'); // returns 'Foo Bar'
startCase('fooBar'); // returns 'Foo Bar'
startCase('__FOO_BAR__'); // returns 'Foo Bar'
startCase('XMLHttpRequest'); // returns 'Xml Http Request'
startCase('_abc_123_def'); // returns 'Abc 123 Def'
startCase('__abc__123__def__'); // returns 'Abc 123 Def'
startCase('_-_-_-_'); // returns ''
startCase('12abc 12ABC'); // returns '12 Abc 12 ABC'
```

## Demo

::: sandpack

```ts index.ts
import { startCase } from 'es-toolkit/string';

console.log(startCase('startCase'));
```

:::
