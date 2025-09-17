# includes (Lodash 호환성)

::: warning `Array.prototype.includes()`나 `String.prototype.includes()`를 사용하세요

이 `includes` 함수는 다양한 데이터 타입 지원, 객체 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.includes()` 또는 `String.prototype.includes()`를 사용하세요.

:::

값이 주어진 배열, 객체 또는 문자열에 포함되어 있는지 확인해요.

비교 연산은 SameValueZero를 사용해요.

## 인터페이스

```typescript
function includes<T>(arr: T[], item: T, fromIndex?: number): boolean;
function includes<T extends Record<string, any>>(obj: T, value: T[keyof T], fromIndex?: number): boolean;
function includes(str: string, substr: string, fromIndex?: number): boolean;
```

### 파라미터

- `source` (`T[] | Record<string, any> | string`): 검색할 배열, 객체 또는 문자열.
- `target` (`T`): 검색할 값.
- `fromIndex` (`number`): 검색을 시작할 인덱스. 음수인 경우 `source`의 끝에서부터의 위치.

### 반환 값

(`boolean`): 검색하는 값이 `source`에 포함되면 `true`, 아니면 `false`.

## 예시

```typescript
includes([1, 2, 3], 2); // true
includes({ a: 1, b: 'a', c: NaN }, 'a'); // true
includes('hello world', 'world'); // true
includes('hello world', 'test'); // false
```
