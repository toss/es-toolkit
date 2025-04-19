# isWindow

This function checks if the given element is a `Window` object.
If the element is a `Window` object, it returns `true`, otherwise it returns `false`.

TypeScript's type guard is commonly used, allowing the parameter to be narrowed to the `Window` type.

## Signature

```typescript
function isWindow(element: unknown): element is Window;
```

### Parameters

- `element` (`unknown`): The element to check if it is a `Window` object.

### Returns

(`element is Window`): If the element is a `Window` object, it returns `true`, otherwise it returns `false`.

## Examples

```typescript
console.log(isWindow(window)); // true
console.log(isWindow(document)); // false
console.log(isWindow({})); // false
```
