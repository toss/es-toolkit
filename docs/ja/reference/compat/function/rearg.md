# rearg

`func` 関数に与えられる引数の順序を変更する新しい関数を生成します。

`indices` 配列が示すインデックスに従って引数の順序が変わります。例えば、`indices` が `[2, 0, 1]` の場合、新しい関数の最初の引数は第三の引数として、第二の引数は第一の引数として、第三の引数は第二の引数として与えられます。

## インターフェース

```typescript
function rearg<F extends (...args: any[]) => any>(
  func: F,
  ...indices: Array<number | number[]>
): (...args: any[]) => ReturnType<F>;
```

### パラメータ

- `func` (`F`): 引数を並べ替える関数です。
- `indices` (`Array<number | number[]>`): 並べ替えられた引数のインデックスです。

### 戻り値

(`(...args: any[]) => ReturnType<F>`): 新しい関数を返します。

## 例

```typescript
const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const rearrangedGreet = rearg(greet, 1, 0);
console.log(rearrangedGreet('World', 'Hello')); // Output: "Hello, World!"
```
