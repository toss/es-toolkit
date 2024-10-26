# isEmpty

Checks if a given value is empty.

- If the given value is a string, checks if it is an empty string.
- If the given value is an array, `Map`, or `Set`, checks if its size is 0.
- If the given value is an [array-like object](../compat/predicate/isArrayLike.md), checks if its length is 0.
- If the given value is an object, checks if it is an empty object with no properties.

## Signature

```typescript
function isEmpty(value: string): value is "";
function isEmpty(value: Map<any, any>): boolean;
function isEmpty(value: Set<any>): boolean;
function isEmpty(value: Array<any>): value is [];
function isEmpty<T extends Record<any, any>>(value: T | null | undefined): value is Record<keyof T, never> | null | undefined;
function isEmpty(value: unknown): boolean;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`boolean`): `true` if the value is empty, `false` otherwise.

## Examples

```typescript
isEmpty(); // true
isEmpty(null); // true
isEmpty(""); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(new Map()); // true
isEmpty(new Set()); // true
isEmpty("hello"); // false
isEmpty([1, 2, 3]); // false
isEmpty({ a: 1 }); // false
isEmpty(new Map([["key", "value"]])); // false
isEmpty(new Set([1, 2, 3])); // false
```