# isSafeInteger

Checks if `value` is a safe integer (between -(253 – 1) and (253 – 1) ).

## Signature

```typescript
function isSafeInteger(value: any): boolean;
```

### Parameters

- `value` (`any`): The value to check.

### Returns

(`boolean`): `true` if `value` is an integer and between the safe values, otherwise `false`

## Examples

```typescript
isSafeInteger(3); // Returns: true
isSafeInteger(3.1); // Returns: false
isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // Returns: false
isSafeInteger(Infinity); // Returns: false
isSafeInteger('3'); // Returns: false
isSafeInteger([]); // Returns: false
```
