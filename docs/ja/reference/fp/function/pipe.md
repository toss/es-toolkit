# pipe

パイプを通過しながら値を処理します。複数のステップで値を加工するコードを宣言的に記述する際に便利です。

加工したい初期値を `pipe` 関数に第一引数として渡し、第二引数以降には値を加工する関数を順番に渡してください。こうすることで、`pipe` 関数の最初の関数は初期値をパラメータとして受け取り、残りの関数は前の関数が返す値を受け取って順番に実行され、最後の関数まで実行されます。

もし初期値が Promise の値であったり、値を処理する過程で非同期関数が存在する場合、`pipe` 関数は値を非同期的に処理して `Promise` を返します。

## インターフェース

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

### パラメータ

- `initial` (`I`): 処理される初期値です。
- `fn1 ~ fn` (`F1 ~ F{n}`): 順番に値を処理する関数たちです。各関数は前の関数の返り値をパラメータとして受け取って実行されます。関数は最大で18個まで渡すことができます。

## 戻り値

(`PipeResult`): 処理された結果値、つまり最後の関数の返り値です。もし初期値が `Promise` であったり、中間に非同期関数がある場合、`pipe` 関数は `Promise` の値を返します。

## 例

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

// 非同期関数と一緒に使用できます。
const asyncResult = await pipe(1, toStringAsync, length);
console.log(asyncResult); // 8

// `curry` 化された関数と一緒に使用できます。
const mapKeyResult = await pipe(
  { a: 1, b: 2 },
  mapKeys((value, key) => key + value)
);
console.log(mapKeyResult); // { a1: 1, b2: 2 }
```
