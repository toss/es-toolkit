# slice (Lodash 호환성)

::: warning `Array.prototype.slice()`를 사용하세요

이 `slice` 함수는 ArrayLike 객체 처리, null/undefined 처리, 희소 배열 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.slice()`를 사용하세요.

:::

인덱스 `start`부터 인덱스 `end`까지 `array`의 부분 배열을 만들어요. 부분 배열에서 `end`는 포함하지 않아요.

기본 `Array.prototype.slice`와 다르게, 희소 배열(Sparse array)에 대해 밀집 배열(Dense array)을 반환하지 않아요.

## 인터페이스

```typescript
function slice<T>(array: T[], start?: number, end?: number): T[];
```

### 파라미터

- `array` (`T[]`): 부분 배열을 만들 배열.

::: info `array`는 `ArrayLike<T>`, `null`, 또는 `undefined`가 될 수 있어요.

lodash와 완전한 호환성을 보장하기 위해, `slice` 함수는 `array`를 다음과 같이 처리해요.

- `array`가 `ArrayLike<T>`인 경우, `Array.from(...)`을 사용하여 배열로 변환돼요.
- `array`가 `null` 또는 `undefined`인 경우, 빈 배열로 처리돼요.

:::

- `start` (`number`): 시작 위치. 기본값은 `0`이에요.
- `end` (`number`): 끝 위치. 기본값은 `array.length`예요.

### 반환 값

(`T[]`): `array`의 `start`부터 `end`까지의 부분 배열.

## 예시

```typescript
slice([1, 2, 3], 1, 2); // => [2]
slice(new Array(3)); // => [undefined, undefined, undefined]
```
