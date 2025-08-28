# get

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Retrieves the value at a given path from an object. If the resolved value is `undefined`, the `defaultValue` is returned instead.

```typescript
const value = get(obj, path);
```

## Reference

### `get(object, deepPath, defaultValue?)`

Use `get` to retrieve a value from an object using deep keys like `a.b`. If the key does not exist, then `defaultValue` is returned.

```typescript
import { get } from 'es-toolkit/compat';

const obj = {
  a: {
    b: 4,
  },
};

get(obj, 'a.b'); // 4
```

#### Parameters

- `obj` (`object`): The object to query.
- `path` (`string` or `number` or `symbol` or `Array<string | number | symbol>`): The path of the property to get.
- `defaultValue` (`unknown`): The value returned if the resolved value is undefined.

#### Returns

(`Get<T, P>`): The resolved value.

## Alternative

The `get` function is often used to safely access nested properties. You can use modern optional chaining syntax as an alternative.

```typescript
var object = { a: [{ b: { c: 3 } }] };
var result = object?.a?.[0]?.b?.c ?? 1;
console.log(result);
```
