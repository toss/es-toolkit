# get

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체에서 주어진 경로에 있는 값을 가져와요. 그 값이 `undefined` 라면, 기본값을 반환해요.

## 인터페이스

```typescript
function get<T extends object, K extends keyof T>(object: T, path: K | [K]): T[K];
function get<T extends object, K extends keyof T>(object: T | null | undefined, path: K | [K]): T[K] | undefined;
function get<T extends object, K extends keyof T, D>(
  object: T | null | undefined,
  path: K | [K],
  defaultValue: D
): Exclude<T[K], undefined> | D;

function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, path: [K1, K2]): T[K1][K2];
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(
  object: T | null | undefined,
  path: [K1, K2]
): T[K1][K2] | undefined;
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], D>(
  object: T | null | undefined,
  path: [K1, K2],
  defaultValue: D
): Exclude<T[K1][K2], undefined> | D;

function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T,
  path: [K1, K2, K3]
): T[K1][K2][K3];
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  object: T | null | undefined,
  path: [K1, K2, K3]
): T[K1][K2][K3] | undefined;
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], D>(
  object: T | null | undefined,
  path: [K1, K2, K3],
  defaultValue: D
): Exclude<T[K1][K2][K3], undefined> | D;

function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
>(object: T, path: [K1, K2, K3, K4]): T[K1][K2][K3][K4];
function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
>(object: T | null | undefined, path: [K1, K2, K3, K4]): T[K1][K2][K3][K4] | undefined;
function get<
  T extends object,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  D,
>(object: T | null | undefined, path: [K1, K2, K3, K4], defaultValue: D): Exclude<T[K1][K2][K3][K4], undefined> | D;

function get<T>(object: Record<number, T>, path: number): T;
function get<T>(object: Record<number, T> | null | undefined, path: number): T | undefined;
function get<T, D>(object: Record<number, T> | null | undefined, path: number, defaultValue: D): T | D;

function get<D>(object: null | undefined, path: PropertyKey, defaultValue: D): D;
function get(object: null | undefined, path: PropertyKey): undefined;

function get<T, P extends string>(data: T, path: P): string extends P ? any : Get<T, P>;
function get<T, P extends string, D = Get<T, P>>(
  data: T,
  path: P,
  defaultValue: D
): Exclude<Get<T, P>, null | undefined> | D;

function get(object: unknown, path: PropertyKey, defaultValue?: unknown): any;
function get(object: unknown, path: PropertyKey | readonly PropertyKey[], defaultValue?: unknown): any;
```

### 파라미터

- `obj` (`object`): 검색할 객체.
- `path` (`string` or `number` or `symbol` or `Array<string | number | symbol>`): 프로퍼티를 가져올 경로.
- `defaultValue` (`unknown`): 찾은 값이 `undefined` 일 때 반환할 값.

### 반환 값

(`Get<T, P>`): 찾은 값.

## 예시

```typescript
import { get } from 'es-toolkit/compat';

const obj = {
  a: {
    b: 4,
  },
};

get(obj, 'a.b'); // 4
get(obj, ['a', 'b']); // 4
get(obj, ['a', 'c']); // undefined
get(obj, ['a', 'c'], null); // null
```
