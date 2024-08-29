# rest

与えられた関数 `func` に対して、特定のインデックスから引数を配列にまとめて渡す新しい関数を作成します。
特定のインデックス以前の引数は個別に渡され、それ以降の引数は配列として一括で渡されます。

## インターフェース

```typescript
function rest<F extends (...args: any[]) => any>(func: F, startIndex: number): (...args: any[]) => ReturnType<F>;
```

### パラメータ

- `func` (`F`): 引数の受け取り方を変更する関数。
- `startIndex` (`number`, オプション): 引数をまとめて渡し始めるインデックス。デフォルト値は `func.length - 1` で、最後のパラメータから配列にまとめて渡します。

### 戻り値

(`(...args: any[]) => ReturnType<F>`): 特定のインデックスからの引数を配列にまとめて `func` に渡す新しい関数。

## 例

```typescript
function fn(a, b, c) {
  return Array.from(arguments);
}

// デフォルトでは最後の引数から配列にまとめて渡します
const func1 = rest(fn);
console.log(func1(1, 2, 3, 4)); // [1, 2, [3, 4]]

// 2番目の引数から配列にまとめて渡します
const func2 = rest(fn, 1);
console.log(func2(1, 2, 3, 4)); // [1, [2, 3, 4]]

// 引数が不足している場合
console.log(func1(1)); // [1, undefined, []]
```
