# pullAllBy

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Removes all specified values from an array using a custom iteratee.

This function changes `arr` in place.
If you want to remove values without modifying the original array, use `differenceBy`.

## Signature

```typescript
function pullAllBy<T>(arr: T[], values: T[], iteratee: (value: T) => unknown): T[];
function pullAllBy<T>(arr: T[], values: T[], iteratee: Partial<T>): T[];
function pullAllBy<T>(arr: T[], values: T[], iteratee: [keyof T, unknown]): T[];
function pullAllBy<T, K extends keyof T>(arr: T[], values: T[], iteratee: K): T[];
function pullAllBy<T>(arr: T[], values: T[], _iteratee: ((value: any) => any) | PropertyKey | object | null);
```

### Parameters

- `arr` (`T[]`): The array to modify.
- `values` (`T[]`): The values to remove from the array.
- `_iteratee` (`((value: any) => any) | PropertyKey | object | null`): The iteratee invoked per element.

### Returns

(`T[]`): The modified array with the specified values removed.