# rest

주어진 함수 `func`에게 특정 인덱스부터 인자를 배열로 묶어서 전달하는 새로운 함수를 만들어요.
특정 인덱스 전의 인자들은 개별로 전달되고, 이후 인자들은 배열로 한꺼번에 묶여서 전달돼요.

## 인터페이스

```typescript
function rest<F extends (...args: any[]) => any>(func: F, startIndex: number): (...args: any[]) => ReturnType<F>;
```

### 파라미터

- `func` (`F`): 인자를 받는 방식을 바꿀 함수.
- `startIndex` (`number`, 선택): 인자를 묶어서 전달하기 시작할 인덱스. 기본값은 `func.length - 1`으로, 마지막 파라미터부터는 배열로 묶어서 전달해요.

### 반환 값

(`(...args: any[]) => ReturnType<F>`): 특정 인덱스부터의 인자를 배열로 묶어서 `func`에 전달하는 새로운 함수.

## 예시

```typescript
function fn(a, b, c) {
  return Array.from(arguments);
}

// 기본적으로는 마지막 인자부터를 배열로 묶어서 전달해요
const func1 = rest(fn);
console.log(func1(1, 2, 3, 4)); // [1, 2, [3, 4]]

// 2번째 인자부터 배열로 묶어서 전달해요
const func2 = rest(fn, 1);
console.log(func2(1, 2, 3, 4)); // [1, [2, 3, 4]]

// 인자를 부족하게 전달하는 경우
console.log(func1(1)); // [1, undefined, []]
```
