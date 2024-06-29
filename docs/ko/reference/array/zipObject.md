# zipObject

두 배열을 하나의 객체로 결합해요. 첫 번째 배열은 프로퍼티 이름을 나타내고, 두 번째 배열은 값을 나타내요. 

프로퍼티 이름을 나타내는 배열이 값을 나타내는 배열보다 길면, 값들은 `undefined`로 채워져요.

## 인터페이스

```typescript
function zipObject<P extends string | number | symbol, V>(keys: P[], values: V[]): { [K in P]: V };
```

### 파라미터

- `keys` (`P[]`): 속성 이름이 포함된 배열이에요.
- `values` (`V[]`): 속성 이름에 대응되는 값이 포함된 배열이에요.

### 반환 값

(`{ [K in P]: V }`): 주어진 속성 이름과 값으로 구성된 새로운 객체예요.

## 예시

```typescript
const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];
const result = zipObject(keys, values);
// result는 { a: 1, b: 2, c: 3 }가 돼요.

const keys2 = ['a', 'b', 'c'];
const values2 = [1, 2];
const result2 = zipObject(keys2, values2);
// result2는 { a: 1, b: 2, c: undefined }가 돼요.

const keys3 = ['a', 'b'];
const values3 = [1, 2, 3];
const result3 = zipObject(keys3, values3);
// result3는 { a: 1, b: 2 }가 돼요.
```
