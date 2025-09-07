# ary

与えられた関数が最大`n`個の引数のみを受け取るように制限する新しい関数を生成します。追加で渡された引数は無視されます。

```typescript
const limitedFunc = ary(func, n);
```

## リファレンス

### `ary(func, n)`

関数が受け取れる引数の個数を制限したい場合は`ary`関数を使用してください。

```typescript
import { ary } from 'es-toolkit';

function fn(a: number, b: number, c: number) {
  return Array.from(arguments);
}

// 引数を受け取らないように制限
ary(fn, 0)(1, 2, 3); // []

// 1つの引数のみ受け取るように制限
ary(fn, 1)(1, 2, 3); // [1]

// 2つの引数のみ受け取るように制限
ary(fn, 2)(1, 2, 3); // [1, 2]
```

`ary`は関数型プログラミングで特に有用です。コールバック関数が予期しない引数を受け取ることを防ぐことができます。

```typescript
// parseIntは(string, radix)の2つの引数を受け取りますが、
// mapは(value, index, array)の3つの引数を渡します。

['1', '2', '3'].map(parseInt);
// 結果: [1, NaN, NaN]
// なぜならparseInt('2', 1)、parseInt('3', 2)が実行されるからです。

// aryを使用して最初の引数のみを渡すように制限
['1', '2', '3'].map(ary(parseInt, 1));
// 結果: [1, 2, 3] ✅
```

### パラメータ

- `func` (`F`): 引数の個数を制限する関数です。
- `n` (`number`): 最大で受け取る引数の個数です。

### 戻り値

(`(...args: any[]) => ReturnType<F>`): 最大`n`個の引数のみを受け取る新しい関数です。
