# pipe

::: info
这个函数只能从 `es-toolkit/fp` 导入，以支持函数式编程风格的代码编写。

从 `es-toolkit/fp` 导入函数后，可以使用管道语法或根据输入参数数量自动 curry 化的函数。
:::

通过管道处理值。在以声明性方式编写对值进行多步骤加工的代码时非常有用。

将要加工的初始值作为第一个参数传递给 `pipe` 函数，从第二个参数开始按顺序传递要加工的函数。这样，`pipe` 函数的第一个函数将接收初始值作为参数，其余函数将接收前一个函数返回的值，并按顺序执行，直到最后一个函数。

如果初始值是 `Promise` 值，或者在处理过程中存在异步函数，`pipe` 函数将异步处理值并返回 `Promise`。

## 签名

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

- `initial` (`I`): 处理的初始值。
- `fn1 ~ fn` (`F1 ~ F{n}`): 顺序处理值的函数。每个函数接收前一个函数的返回值作为参数执行。最多可以传递 18 个函数。

## 반환 값

(`PipeResult`): 处理后的结果值，即最后一个函数的返回值。如果初始值是 `Promise` 或者中间有异步函数，那么 `pipe` 函数将返回 `Promise` 值。

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

// 可以与异步函数一起使用。
const asyncResult = await pipe(1, toStringAsync, length);
console.log(asyncResult); // 8

// 可以与 `curry` 化的函数一起使用。
const mapKeyResult = await pipe(
  { a: 1, b: 2 },
  mapKeys((value, key) => key + value)
);
console.log(mapKeyResult); // { a1: 1, b2: 2 }
```
