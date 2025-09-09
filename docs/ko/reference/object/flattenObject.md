# flattenObject

중첩된 객체를 단순한 객체로 평탄화해요.

- `Array`는 평탄화돼요.
- 순수 객체가 아닌 `Buffer`나 `TypedArray`는 평탄화되지 않아요.

## 인터페이스

```typescript
function flattenObject(object: object, { delimiter = '.' }: FlattenObjectOptions = {}): Record<string, any>;
```

### 파라미터

- `object` (`object`): 평탄화할 객체.
- `delimiter` (`string`): 중첩된 키의 구분자. 기본값은 `.`.

### 반환 값

(`T`): 평탄화된 객체.

## 예시

```typescript
const nestedObject = {
  a: {
    b: {
      c: 1,
    },
  },
  d: [2, 3],
};

const flattened = flattenObject(nestedObject);
console.log(flattened);
// Output:
// {
//   'a.b.c': 1,
//   'd.0': 2,
//   'd.1': 3
// }
```

```typescript
const flattened = flattenObject(nestedObject, { delimiter: '/' });
console.log(flattened);
// Output:
// {
//   'a/b/c': 1,
//   'd/0': 2,
//   'd/1': 3
// }
```
