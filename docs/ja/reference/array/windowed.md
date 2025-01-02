# windowed

与えられた入力配列から指定されたサイズの小さな部分配列（ウィンドウ）を作成します。
ウィンドウは指定された `step` のサイズに応じて重なることがあります。

デフォルトでは、結果には `size` の長さを持つ完全なウィンドウのみが含まれます。
完全なウィンドウを形成できない残りの要素は無視されます。

オプションオブジェクトの `partialWindows` が `true` に設定されている場合、`size` より小さい部分ウィンドウも結果に含まれます。
部分ウィンドウは、入力配列に完全なウィンドウを作成するのに十分な要素が残っていない場合に作成されます。

## インターフェース

```typescript
function windowed<T>(arr: T[], size: number, step: number, { partialWindows = false }: WindowedOptions): T[][];

interface WindowedOptions {
  partialWindows?: boolean;
}
```

### パラメータ

- `arr` (`readonly T[]`): ウィンドウを作成するための入力配列。
- `size` (`number`): 各ウィンドウのサイズ。正の整数でなければなりません。
- `step` (`number`): 各ウィンドウの開始間隔。正の整数でなければなりません。
- `options.partialWindows` (`boolean`): 配列の末尾に部分ウィンドウを含めるかどうか。

### 戻り値

(`T[][]`): 入力配列から作成されたウィンドウ（部分配列）の配列。

## 例

```typescript
windowed([1, 2, 3, 4], 2);
// => [[1, 2], [2, 3], [3, 4]]

windowed([1, 2, 3, 4, 5, 6], 3, 2);
// => [[1, 2, 3], [3, 4, 5]]

windowed([1, 2, 3, 4, 5, 6], 3, 2, { partialWindows: true });
// => [[1, 2, 3], [3, 4, 5], [5, 6]]
```
