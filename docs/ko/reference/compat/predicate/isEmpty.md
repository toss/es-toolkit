# isEmpty

::: info

이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.

:::

주어진 값이 비어 있는지 확인해요.

- 주어진 값이 문자열인 경우, 빈 문자열인지 검사해요.
- 주어진 값이 배열, `Map`이나 `Set`인 경우, 크기가 0인지 검사해요.
- 주어진 값이 [배열 같은 객체](../predicate/isArrayLike.md)인 경우, 길이가 0인지 검사해요.
- 주어진 값이 객체인 경우, 프로퍼티를 가지지 않는 빈 객체인지 검사해요.
- 문자열, 불리언, 숫자, Bigint와 같은 원시 값은 빈 값이에요.

## 인터페이스

```typescript
function isEmpty(): true;
function isEmpty(value: string): value is '';
function isEmpty(value: Map<any, any>): boolean;
function isEmpty(value: Set<any>): boolean;
function isEmpty(value: any[]): value is [];
function isEmpty<T extends Record<any, any>>(
  value: T | null | undefined
): value is Record<keyof T, never> | null | undefined;
function isEmpty(value: unknown): boolean;
```

### 파라미터

- `value` (`unknown`): 확인할 값.

### 반환 값

(`boolean`): 값이 비어 있으면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
isEmpty(); // true
isEmpty(null); // true
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(new Map()); // true
isEmpty(new Set()); // true
isEmpty('hello'); // false
isEmpty([1, 2, 3]); // false
isEmpty({ a: 1 }); // false
isEmpty(new Map([['key', 'value']])); // false
isEmpty(new Set([1, 2, 3])); // false
```
