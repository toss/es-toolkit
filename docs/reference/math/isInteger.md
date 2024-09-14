# isInteger

Checks if `value` is an integer.

## Signature

```typescript
function isInteger(value: any): boolean;
```

### Parameters

- `value` (`any`): The value to check.

### Returns

(`boolean`): `true` if `value` is integer, otherwise `false`

## Examples

```typescript
isInteger(3); // Returns: true
isInteger(3.1); // Returns: false
isInteger(Infinity); // Returns: false
isInteger('3'); // Returns: false
<<<<<<< HEAD
isInteger([]); // Returns: false
=======
isInteger([]]); // Returns: false
>>>>>>> a1271d8 (Implement isInteger)
```
