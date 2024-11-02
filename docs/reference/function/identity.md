# identity

Returns the input value unchanged.

## Signature

```typescript
function identity<T>(x: T);
```

### Parameters

- `x` (`T`): The value to be returned.

### Returns

(`T`): The input value.

## Examples

```typescript
// Returns 5
identity(5);

// Returns 'hello'
identity('hello');

// Returns { key: 'value' }
identity({ key: 'value' });
```
