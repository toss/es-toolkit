# takeRight

Returns a new array containing the last `count` elements from the input array `arr`.

If `count` is greater than the length of `arr`, the entire array is returned.


## Signature

```typescript
function takeRight<T>(arr: T[], count: number): T[];
```

### Parameters 

- `arr` (`T[]`): The array to take elements from. 
- `count` (`number`): The number of elements to take.

### Returns

(`T[]`) A new array containing the last `count` elements from `arr`.


## Examples

```typescript
// Returns [4, 5]
takeRight([1, 2, 3, 4, 5], 2);

// Returns ['b', 'c']
takeRight(['a', 'b', 'c'], 2);

// Returns [1, 2, 3]
takeRight([1, 2, 3], 5);
```