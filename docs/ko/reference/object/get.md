# get

주어진 객체에 대한 파트에 따라 객체의 값을 리턴해요.

## Signature
```typescript
function get<O, T>(obj: O, path: string | string[], defaultValue?: T): O[keyof O] | T | undefined;
```

### Parameters

 - `obj` (`O`): 찾아볼 객체이예요.
 - `path` (`string` 또는 `string[]`): 찾아볼 객체에 대한 파트에요.
 - `defaultValue` (`T`): 파트에 따른 객체의 값이 존재하지 않다면, 대신 리턴할 값이예요.

### Returns

(`O[keyof O]`, `T` 또는 `undefined`): `undefined`, 대신 리턴된 값이거나 주어지 객체에 대한 어느 특정한 값이예요.

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