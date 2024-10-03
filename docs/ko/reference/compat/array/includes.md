# includes

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
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
