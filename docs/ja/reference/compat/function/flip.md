# flip

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`func`を引数を逆にして呼び出す関数を作成します。

## インターフェース

```typescript
function flip<F extends (...args: any[]) => any>(func: F): (...args: Reversed<Parameters<F>>) => ReturnType<F>;
```

### パラメータ

- `func` (`F`): 引数を反転させる関数。

### 戻り値

(`(...args: Reversed<Parameters<F>>) => ReturnType<F>`): 新しい反転された関数を返します。

## 例

```typescript
function fn(a: string, b: string, c: string, d: string) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped('a', 'b', 'c', 'd'); // => ['d', 'c', 'b', 'a']
```
