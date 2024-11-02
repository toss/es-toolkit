# rangeRight

`end`에서 시작해서 `start` 전에 끝나는 숫자의 배열을 반환해요. 연속한 숫자는 `step` 만큼 차이가 나요.

`step`이 기본값은 1이고, 0일 수 없어요.

## 인터페이스

```typescript
function rangeRight(end: number): number[];
function rangeRight(start: number, end: number): number[];
function rangeRight(start: number, end: number, step: number): number[];
```

### 파라미터

- `start` (`number`): 시작할 숫자. 배열은 이 숫자를 포함해요.
- `end` (`number`): 끝날 숫자. 배열은 이 숫자를 포함하지 않아요.
- `step` (`number`): 배열에서 연속한 숫자의 차이. 기본값은 `1`이에요.

### 반환 값

- (`number[]`): `end`에서 시작해서 `start` 전에 끝나는, 연속한 숫자가 `step` 만큼 차이나는 배열.

## 예시

```typescript
// Returns [3, 2, 1, 0]
rangeRight(4);

// Returns [15, 10, 5, 0]
rangeRight(0, 20, 5);

// Returns [20, 15, 10, 5, 0]
rangeRight(0, 21, 5);

// Returns [-3, -2, -1, 0]
rangeRight(0, -4, -1);

// Throws an error: The step value must be a non-zero integer.
rangeRight(1, 4, 0);
```
