# JSONValue

Any value that `JSON.parse` can produce.

```typescript
type Value = JSONValue;
```

## Usage

### `JSONValue`

Use it for data that crosses a JSON boundary, such as an API response or a config file. Functions, `Date`, `undefined`, and class instances are excluded because they do not survive a JSON round trip.

```typescript
import type { JSONValue } from 'es-toolkit/types';

declare function parse(text: string): JSONValue;

const value = parse('{"a":[1,null]}');
if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
  const a = value.a; // JSONValue
}

const ok: JSONValue = { name: 'toss', tags: ['a', 'b'], count: null };

// const bad: JSONValue = { at: new Date() }; // error, a Date is not JSON

// Use Record when you want a JSON object specifically.
declare function send(body: Record<string, JSONValue>): void;
```

#### Type Parameters

- Note that `NaN` and `Infinity` are not valid JSON even though they are `number` values. TypeScript cannot express that difference.
