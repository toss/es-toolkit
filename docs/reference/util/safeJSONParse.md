# safeJSONParse

Safely parses a JSON string without throwing.

```typescript
const result = safeJSONParse(value);
```

## Usage

### `safeJSONParse(value)`

Use `safeJSONParse` when you want to parse a JSON string safely, without risking a `JSON.parse` exception. If the value is a string containing valid JSON, the parsed result is returned. Otherwise, `safeJSONParse` returns `null`.

This is especially useful when dealing with user input, loosely-typed data, or untrusted sources where you can't guarantee that the value is always a valid JSON string.

```typescript
import { safeJSONParse } from 'es-toolkit/util';

// Valid JSON strings
safeJSONParse('{"name":"JinHo","age":29}'); // { name: "JinHo", age: 29 }
safeJSONParse('[1, 2, 3]'); // [1, 2, 3]
safeJSONParse('"hello world"'); // "hello world"
safeJSONParse('42'); // 42
safeJSONParse('true'); // true
safeJSONParse('false'); // false
safeJSONParse('null'); // null (valid JSON, parsed value is null)

// Invalid JSON strings
safeJSONParse('invalid json'); // null
safeJSONParse('{"unclosed": "object"'); // null
safeJSONParse('[1,2,'); // null
safeJSONParse('undefined'); // null
safeJSONParse(''); // null

// Non-string values
safeJSONParse({ name: 'JinHo' }); // null
safeJSONParse([1, 2, 3]); // null
safeJSONParse(42); // null
safeJSONParse(true); // null
safeJSONParse(null); // null
safeJSONParse(undefined); // null
```

### Type-safe parsing with generics

You can use the generic parameter `T` to describe the expected shape of the parsed JSON value:

```typescript
import { safeJSONParse } from 'es-toolkit/util';

type User = {
  id: number;
  name: string;
  isAdmin: boolean;
};

const raw = '{"id":1,"name":"JinHo","isAdmin":false}';

const user = safeJSONParse<User>(raw);
// user: User | null

if (user !== null) {
  // user is narrowed to User here
  console.log(user.id); // number
  console.log(user.name); // string
  console.log(user.isAdmin); // boolean
}
```

If no type argument is provided, the return type defaults to `unknown | null`:

```typescript
const result = safeJSONParse('{"name": "JinHo"}');
// result: unknown | null
```

You can combine `safeJSONParse` with your own type guards (e.g. `isJSONObject`, `isJSONValue`) to further validate the parsed structure.

### Using with isJSON

`safeJSONParse` is designed to complement the `isJSON` predicate:

- Use `isJSON(value)` when you only need to check if a value is a valid JSON string.
- Use `safeJSONParse(value)` when you actually want to parse the JSON string and work with the result.

```typescript
import { isJSON } from 'es-toolkit/predicate';
import { safeJSONParse } from 'es-toolkit/util';

function parseIfJson(input: unknown) {
  if (!isJSON(input)) {
    // input is not a valid JSON string
    return null;
  }

  // input is now typed as string
  const parsed = safeJSONParse(input);

  // parsed is the JSON value (or null if something unexpected happens)
  return parsed;
}
```

### Practical examples

#### API response parsing

```typescript
import { safeJSONParse } from 'es-toolkit/util';

type ApiResponse = {
  success: boolean;
  payload?: unknown;
};

function handleApiResponse(responseBody: unknown) {
  const data = safeJSONParse<ApiResponse>(responseBody);

  if (data === null) {
    return {
      success: false,
      error: 'Response body is not valid JSON',
    };
  }

  if (!data.success) {
    return {
      success: false,
      error: 'API reported failure',
    };
  }

  return {
    success: true,
    payload: data.payload,
  };
}
```

#### User input parsing

```typescript
import { safeJSONParse } from 'es-toolkit/util';

function tryParseUserConfig(input: unknown) {
  const config = safeJSONParse<Record<string, unknown>>(input);

  if (config === null) {
    return {
      isValid: false,
      config: null,
      error: 'Input is not valid JSON',
    };
  }

  return {
    isValid: true,
    config,
    error: null,
  };
}
```

::: info Note about "null" string

When the input is the string `"null"`, `safeJSONParse("null")` returns `null` because that's the actual parsed value. This is indistinguishable from a parse failure purely from the return value, so if you need to distinguish the two cases, combine `isJSON` and `safeJSONParse` or introduce a custom result type.

:::

#### Parameters

- `value` (`unknown`): The value to parse as JSON.

#### Returns

(`T | null`): The parsed JSON value if `value` is a string containing valid JSON; otherwise `null`.
