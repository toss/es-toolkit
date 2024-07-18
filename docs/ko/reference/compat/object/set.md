# set

::: info
`es-toolkit/compat` 라이브러리에서 [lodash와 완전히 호환](../../../compatibility.md)돼요.
:::

지정된 경로에 주어진 값을 설정해요. 경로의 일부가 존재하지 않으면 생성됩니다.

## 인터페이스

```typescript
function set<T>(obj: Settable, path: Path, value: any): T;
```

### 파라미터

- `obj` (`T`): 값을 설정할 객체.
- `path` (`string | number | symbol | Array<string | number | symbol>`): 값을 설정할 프로퍼티 경로.
- `value` (`unknown`): 설정할 값.

### 반환 값

(`T`): 수정된 객체를 반환해요. T를 지정하지 않으면 unknown이에요.

## 예시

```typescript
import { set } from 'es-toolkit/compat';

// 중첩된 객체에 값 설정
const obj = { a: { b: { c: 3 } } };
set(obj, 'a.b.c', 4);
console.log(obj.a.b.c); // 4

// 배열에 값 설정
const arr = [1, 2, 3];
set(arr, 1, 4);
console.log(arr[1]); // 4

// 존재하지 않는 경로 생성 및 값 설정
const obj2 = {};
set(obj2, 'a.b.c', 4);
console.log(obj2); // { a: { b: { c: 4 } } }

// 인터페이스 사용
interface O {
  a: number;
}
const obj3 = {};
const result = set<O>(obj3, 'a', 1); // result 타입 = { a: number }
console.log(result); // { a: 1 }
```
