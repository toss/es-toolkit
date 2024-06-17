# maxBy

Selects the first element of a list that has the maximum value of a function.

If the list is empty, returns `undefined`.

## Signature

```typescript
function maxBy<T>(elements: T[], selector: (element: T) => number): T
```

### Parameters

- `elements`: an array of elements to search through.
- `selector`: a function that takes an element and returns a number that the property of the object.

### Returns

The first element of the list that has the maximum value of the function. If the list is empty, returns `undefined`.

### Example

```typescript
maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a) // Returns: { a: 3 }
maxBy([], x => x.a) // Returns: undefined
```
