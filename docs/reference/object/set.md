# set

Sets the given value at the specified path of the object. If any part of the path does not exist, it will be created.

## Signature

```typescript
function set<T>(obj: Settable, path: Path, value: any): T;
```

### Parameters

- `obj` (Settable): The object to modify.
- `path` (Path): The path of the property to set.
- `value` (any): The value to set.

### Returns

(`T`): Returns the modified object. If T is not specified, it defaults to unknown.

## Examples

```typescript
// Set a value in a nested object
const obj = { a: { b: { c: 3 } } };
set(obj, 'a.b.c', 4);
console.log(obj.a.b.c); // 4

// Set a value in an array
const arr = [1, 2, 3];
set(arr, 1, 4);
console.log(arr[1]); // 4

// Create non-existent path and set value
const obj2 = {};
set(obj2, 'a.b.c', 4);
console.log(obj2); // { a: { b: { c: 4 } } }

// Use with interface
interface O {
  a: number;
}
const obj3 = {};
const result = set<O>(obj3, 'a', 1); // typeof result = { a: number }
console.log(result); // { a: 1 }
```
