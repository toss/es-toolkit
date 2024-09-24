# compact

Removes falsey values (`false`, `null`, `0`, `0n`, `''`, `undefined`, `NaN`) from an array.

## Signature

```typescript
function compact<T>(arr: T[]): Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>;
```

### Parameters

- `arr` (`T[]`): The input array to remove falsey values.

### Returns

(`Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>`) A new array with all falsey values removed.

## Examples

```typescript
compact([0, 0n, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// Returns: [1, 2, 3, 4, 5]
```
