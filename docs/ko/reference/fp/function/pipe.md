# pipe

::: info
이 함수는 함수형 프로그래밍 방식의 코드 작성을 지원하기 위한 `es-toolkit/fp` 에서만 가져올 수 있어요.

`es-toolkit/fp`에서 함수를 가져오면 pipe 문법을 사용하거나 인자 입력 갯수에 따라 자동으로 커링되는 함수를 사용할 수 있어요.
:::

파이프를 통과하면서 값을 처리해요. 여러 단계에 걸쳐 값을 가공하는 코드를 선언적으로 작성할 때 유용해요.

가공하고자 하는 초기값을 `pipe` 함수에 첫번째 인자값으로 전달하고, 두번째부터는 값을 가공할 함수를 순서대로 전달하세요. 이렇게 하면 `pipe` 함첫 번째 함수는 초기값을 파라미터로 받고, 나머지 함수들은 앞선 함수가 반환하는 값을 받아 순서대로 실행되는 형태로 마지막 함수까지 실행할 수 있어요.

만약 초기값이 `Promise` 값이거나, 값을 처리하는 과정에서 비동기 함수가 존재하면, `pipe` 함수가 값을 비동기적으로 처리해서 `Promise`를 반환해요.

## 인터페이스

```typescript
export function pipe<I, F1 extends NextFuntion<I, true>>(initial: I, fn1: F1): PipeResult<[I, F1]>;
export function pipe<I, F1 extends NextFuntion<I, true>, F2 extends NextFunction<F1>>(
  initial: I,
  fn1: F1,
  fn2: F2
): PipeResult<[I, F1, F2]>;
export function pipe<I, F1 extends NextFuntion<I, true>, F2 extends NextFunction<F1>, F3 extends NextFunction<F2>>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3
): PipeResult<[I, F1, F2, F3]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
>(initial: I, fn1: F1, fn2: F2, fn3: F3, fn4: F4): PipeResult<[I, F1, F2, F3, F4]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
>(initial: I, fn1: F1, fn2: F2, fn3: F3, fn4: F4, fn5: F5): PipeResult<[I, F1, F2, F3, F4, F5]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
>(initial: I, fn1: F1, fn2: F2, fn3: F3, fn4: F4, fn5: F5, fn6: F6): PipeResult<[I, F1, F2, F3, F4, F5, F6]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
  F15 extends NextFunction<F14>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14,
  fn15: F15
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
  F15 extends NextFunction<F14>,
  F16 extends NextFunction<F15>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14,
  fn15: F15,
  fn16: F16
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
  F15 extends NextFunction<F14>,
  F16 extends NextFunction<F15>,
  F17 extends NextFunction<F16>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14,
  fn15: F15,
  fn16: F16,
  fn17: F17
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17]>;
export function pipe<
  I,
  F1 extends NextFuntion<I, true>,
  F2 extends NextFunction<F1>,
  F3 extends NextFunction<F2>,
  F4 extends NextFunction<F3>,
  F5 extends NextFunction<F4>,
  F6 extends NextFunction<F5>,
  F7 extends NextFunction<F6>,
  F8 extends NextFunction<F7>,
  F9 extends NextFunction<F8>,
  F10 extends NextFunction<F9>,
  F11 extends NextFunction<F10>,
  F12 extends NextFunction<F11>,
  F13 extends NextFunction<F12>,
  F14 extends NextFunction<F13>,
  F15 extends NextFunction<F14>,
  F16 extends NextFunction<F15>,
  F17 extends NextFunction<F16>,
  F18 extends NextFunction<F17>,
>(
  initial: I,
  fn1: F1,
  fn2: F2,
  fn3: F3,
  fn4: F4,
  fn5: F5,
  fn6: F6,
  fn7: F7,
  fn8: F8,
  fn9: F9,
  fn10: F10,
  fn11: F11,
  fn12: F12,
  fn13: F13,
  fn14: F14,
  fn15: F15,
  fn16: F16,
  fn17: F17,
  fn18: F18
): PipeResult<[I, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17, F18]>;
```

### 파라미터

- `initial` (`I`): 처리될 초기 값이에요.
- `fn1 ~ fn` (`F1 ~ F{n}`): 순서대로 값을 처리할 함수들이에요. 각 함수는 이전 함수의 반환값을 파라미터로 전달 받아 실행돼요. 함수들은 최대 18개까지 전달할 수 있어요.

## 반환 값

(`PipeResult`): 처리된 결과 값, 즉 마지막 함수의 반환값이에요. 만약 초기 값이 `Promise`이거나 중간에 비동기 함수가 있다면, `pipe` 함수는 `Promise` 값을 반환해요.

## 예시

```typescript
function toString(value: unknown) {
  return `string:${value}`;
}

function toStringAsync(value: unknown) {
  return Promise.resolve(`string:${value}`);
}

function length(value: string) {
  return value.length;
}

const result = pipe(1, toString, length);
console.log(result); // 8

// 비동기 함수와 함께 사용할 수 있어요.
const asyncResult = await pipe(1, toStringAsync, length);
console.log(asyncResult); // 8

// 커링된 함수와 함께 사용할 수 있어요.
const mapKeyResult = await pipe(
  { a: 1, b: 2 },
  mapKeys((value, key) => key + value)
);
console.log(mapKeyResult); // { a1: 1, b2: 2 }
```
