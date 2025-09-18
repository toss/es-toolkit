# zipObjectDeep (Lodash 호환성)

::: warning 네이티브 배열 메서드를 사용하세요

이 `zipObjectDeep` 함수는 복잡한 경로 처리, 객체 중첩 로직 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 네이티브 JavaScript 객체 조작과 구조 분해 할당을 사용하세요.

:::

경로 배열과 값 배열을 사용하여 깊이 중첩된 객체를 만들어요.

```typescript
const result = zipObjectDeep(keys, values);
```

## 레퍼런스

### `zipObjectDeep(keys, values)`

첫 번째 배열의 경로와 두 번째 배열의 값을 사용하여 깊이 중첩된 객체를 생성해요. 경로는 점 표기법 문자열이나 속성 이름 배열로 제공할 수 있어요. 복잡한 중첩 구조의 데이터를 생성하거나 평면적인 키-값 쌍을 계층적 객체로 변환할 때 유용해요.

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

// 점 표기법 문자열로 경로 지정
const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// Returns: { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

// 배열로 경로 지정
const pathArrays = [['a', 'b', 'c'], ['d', 'e', 'f']];
const values2 = [1, 2];
const result2 = zipObjectDeep(pathArrays, values2);
// Returns: { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

// 배열 인덱스를 포함한 경로
const arrayPaths = ['a.b[0].c', 'a.b[1].d'];
const values3 = [1, 2];
const result3 = zipObjectDeep(arrayPaths, values3);
// Returns: { a: { b: [{ c: 1 }, { d: 2 }] } }
```

`null`이나 `undefined` 키 배열은 빈 객체로 처리해요.

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

zipObjectDeep(null, [1, 2]); // {}
zipObjectDeep(undefined, [1, 2]); // {}
```

#### 파라미터

- `keys` (`ArrayLike<PropertyPath> | null | undefined`): 속성 경로 배열이에요. 점 표기법 문자열이나 속성 이름 배열을 사용할 수 있어요.
- `values` (`ArrayLike<any>`, 선택): 해당하는 값들의 배열이에요. 제공하지 않으면 빈 배열로 처리해요.

### 반환 값

(`object`): 주어진 경로와 값으로 구성된 깊이 중첩된 객체를 반환해요.
