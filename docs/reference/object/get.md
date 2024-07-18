# get

Returns the value of an object based on the parts for the given object.

## Signature
```typescript
function get<O, T>(obj: O, path: string | string[], defaultValue?: T): O[keyof O] | T | undefined;
```

### Parameters

 - `obj` (`O`): The object to browse.
 - `path` (`string` or `string[]`): The part about the object to be found.
 - `defaultValue` (`T`): If the value of the object based on the part doesn't exist, this is the value to return instead.

### Returns

(`O[keyof O]`, `T` or `undefined`): `undefined`, the value returned instead, or some specific value for the given object.

### Examples

```typescript
const obj = {
  a: {
    b: 4
  }
}
console.log(obj, 'a.b') // 4
console.log(obj, ['a', 'b']) // 4
console.log(obj, ['a', 'c']) // undefined
console.log(obj, ['a', 'c'], null) // null
```