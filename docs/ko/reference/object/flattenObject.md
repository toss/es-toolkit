# flattenObject

중첩된 객체를 단순한 객체로 평탄화하거나 Map으로 직접 변환해요.

- `Array`는 평탄화돼요.
- 순수 객체가 아닌 `Buffer`나 `TypedArray`는 평탄화되지 않아요.

## 인터페이스

```typescript
// Record<string, any> 반환
function flattenObject(object: object, options?: { delimiter?: string }): Record<string, any>;

// Map<string, any> 반환 (기존 문법)
function flattenObject(object: object, target: Map<string, any>): Map<string, any>;

// Map<string, any> 반환 (구분자 포함)
function flattenObject(object: object, options: { delimiter?: string; target: Map<string, any> }): Map<string, any>;
```

### 파라미터

- `object` (`object`): 평탄화할 객체.
- `options` (`object`, 선택): 옵션 객체.
  - `delimiter` (`string`): 중첩된 키의 구분자. 기본값은 `.`.
  - `target` (`Map<string, any>`): 평탄화된 키-값 쌍으로 채울 Map.

### 반환 값

(`Record<string, any> | Map<string, any>`): 평탄화된 객체 또는 Map.

## 예시

### 기본 사용법 (Record)

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

### 구분자 지정 (Record)

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

### Map 대상 (기존 문법)

```typescript
const map = flattenObject(nestedObject, new Map());
console.log(map);
// Output: Map { 'a.b.c' => 1, 'd.0' => 2, 'd.1' => 3 }

// 값 접근
console.log(map.get('a.b.c')); // 1
console.log(map.size); // 3
```

### Map + 구분자 지정

```typescript
const customMap = flattenObject(nestedObject, {
  delimiter: '_',
  target: new Map(),
});
console.log(customMap);
// Output: Map { 'a_b_c' => 1, 'd_0' => 2, 'd_1' => 3 }
```
