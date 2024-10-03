# pick

선택한 객체 프로퍼티들로 구성된 새로운 객체를 생성해요.

이 함수는 객체와 키 배열을 받아, 지정된 키에 해당하는 프로퍼티들만 포함하는 새로운 객체를 반환해요.

## 인터페이스

```typescript
function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
```

### 파라미터

- `obj` (`T`): 키를 선택할 객체예요.
- `keys` (`K[]`): 객체에서 선택할 키들의 배열이에요.

### 반환 값

(`Pick<T, K>`): 지정된 키들이 선택된 새로운 객체예요.

## 예시

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = pick(obj, ['a', 'c']);
// 결과는 다음과 같아요 { a: 1, c: 3 }
```

## Lodash와의 호환성

`es-toolkit/compat`에서 `pick` 함수를 가져오면, 깊은 경로를 선택할 수 있어요.

```typescript
import { pick } from 'es-toolkit/compat';

const obj = { a: { b: { c: 1 } }, d: { e: 2 }, f: { g: 3 }, 'f.g': 4 };
const result = pick(obj, ['a.b.c', 'f.g']);
// 결괏값: { a: { b: { c: 1 } }, 'f.g': 4 }
```
