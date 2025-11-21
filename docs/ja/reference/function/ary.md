# ary

関数が受け取れる引数の個数を制限する新しい関数を作成します。

```typescript
const limitedFunc = ary(func, n);
```

## 使用法

### `ary(func, n)`

関数が受け取れる引数の個数を制限したいときに`ary`を使用してください。追加で渡された引数は無視されます。関数型プログラミングでコールバック関数が予期しない引数を受け取ることを防ぐときに特に便利です。

```typescript
import { ary } from 'es-toolkit/function';

function fn(a: number, b: number, c: number) {
  return Array.from(arguments);
}

// 引数を受け取らないように制限
ary(fn, 0)(1, 2, 3);
// Returns: []

// 1つの引数のみ受け取るように制限
ary(fn, 1)(1, 2, 3);
// Returns: [1]

// 2つの引数のみ受け取るように制限
ary(fn, 2)(1, 2, 3);
// Returns: [1, 2]
```

`map`のような配列メソッドと一緒に使用するときに特に便利です。

```typescript
// parseIntは2つの引数を受け取りますが、mapは3つを渡します
['1', '2', '3'].map(parseInt);
// Returns: [1, NaN, NaN]

['1', '2', '3'].map(parseInt);
// 結果: [1, NaN, NaN]
// なぜならparseInt('2', 1)、parseInt('3', 2)が実行されるからです。

// aryを使用して最初の引数のみを渡すように制限
['1', '2', '3'].map(ary(parseInt, 1));
// 結果: [1, 2, 3] ✅
```

#### パラメータ

- `func` (`F`): 引数の個数を制限する関数です。
- `n` (`number`): 最大で受け取る引数の個数です。

#### 戻り値

(`(...args: any[]) => ReturnType<F>`): 最大`n`個の引数のみを受け取る新しい関数です。
