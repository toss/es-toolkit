# sampleSize

지정된 `size`의 샘플 요소 배열을 반환해요.

이 함수는 배열과 숫자를 받아요. [Floyd의 알고리즘](https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html)을 사용해서 샘플된 요소들이 포함된 배열을 반환해요.

## 인터페이스

```typescript
function sampleSize<T>(array: T[], size: number): T[];
```

### 파리미터

- `array` (`T[]`): 샘플링할 배열이에요.
- `size` (`number`): 샘플링할 크기예요.

### 반환 값

(`T[]`): 샘플 크기가 적용된 새로운 배열이에요.

### 에러

`size`가 `array`의 길이보다 크면 에러를 던져요.

## 예시

```typescript
const result = sampleSize([1, 2, 3], 2);
// 결과는 배열의 요소 중 두 개를 포함하는 배열이 돼요.
// [1, 2] or [1, 3] or [2, 3]
```
