# windowed

주어진 입력 배열에서 지정된 크기의 작은 부분 배열인 윈도우를 생성해요.
윈도우는 주어진 `step`의 크기에 따라 겹칠 수 있어요.

기본적으로 결과에는 `size`만큼의 길이를 가지는 완전한 윈도우만 포함돼요.
완전한 윈도우를 이루지 못하는 남은 요소들은 무시돼요.

만약 옵션 객체의 `partialWindows`가 `true`로 설정된다면, `size` 보다 짧은 부분 윈도우도 결괏값에 포함돼요.
부분 윈도우는 입력 배열에 완전한 윈도우를 만들 수 있을 만큼 충분한 요소가 남아 있지 않을 때 생겨요.

## 인터페이스

```typescript
function windowed<T>(arr: T[], size: number, step: number, { partialWindows = false }: WindowedOptions): T[][];

interface WindowedOptions {
  partialWindows?: boolean;
}
```

### 파라미터

- `arr` (`readonly T[]`): 윈도우를 생성할 입력 배열.
- `size` (`number`): 각 윈도우의 크기에요. 자연수여야 해요.
- `step` (`number`): 각 윈도우 시작 간의 간격. 자연수여야 해요.
- `options.partialWindows` (`boolean`): 배열 끝에 부분 윈도우를 포함할지 여부.

### 반환 값

(`T[][]`): 입력 배열에서 생성된 윈도우(배열) 모음.

## 예시

```typescript
windowed([1, 2, 3, 4], 2);
// => [[1, 2], [2, 3], [3, 4]]

windowed([1, 2, 3, 4, 5, 6], 3, 2);
// => [[1, 2, 3], [3, 4, 5]]

windowed([1, 2, 3, 4, 5, 6], 3, 2, { partialWindows: true });
// => [[1, 2, 3], [3, 4, 5], [5, 6]]
```
