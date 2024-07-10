# zipObjectDeep

경로와 값 배열을 사용하여 깊게 중첩된 객체를 생성합니다.

이 함수는 두 개의 배열을 사용합니다. 하나는 속성 경로의 배열이고 다른 하나는 해당 값의 배열입니다. 이 함수는 첫 번째 배열의 경로를 키 경로로 사용하여 값을 설정한 새 객체를 반환합니다. 두 번째 배열의 해당 요소는 값으로 사용됩니다. 경로는 점으로 구분된 문자열이나 속성 이름의 배열일 수 있습니다.

프로퍼티 이름을 나타내는 배열이 값을 나타내는 배열보다 길면, 값들은 `undefined`로 채워져요.

## 인터페이스

```typescript
function zipObjectDeep<P extends string | number | symbol, V>(keys: P[], values: V[]): { [K in P]: V };
```

### 파라미터

- `keys` (`P[]`): 속성 이름이 포함된 배열이에요.
- `values` (`V[]`): 속성 이름에 대응되는 값이 포함된 배열이에요.

### 반환 값

(`{ [K in P]: V }`): 주어진 속성 이름과 값으로 구성된 새로운 객체예요.

## 예시

```typescript
const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result 는 { a: { b: { c: 1 } }, d: { e: { f: 2 } } }가 돼요

const paths = [['a', 'b', 'c'], ['d', 'e', 'f']];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result 는 { a: { b: { c: 1 } }, d: { e: { f: 2 } } }가 돼요

const paths = ['a.b[0].c', 'a.b[1].d'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result 는 { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }가 돼요
```
