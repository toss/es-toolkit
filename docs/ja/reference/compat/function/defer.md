# defer

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`func`を呼び出しを、現在のコールスタックがクリアされるまで遅延します。追加の引数は、呼び出されたときに`func`に提供されます。

## インターフェース

```typescript
function defer<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): number;
```

### パラメータ

- `func` (`F`): 遅延する関数。
- `args` (`Parameters<F>`): `func`を呼び出すための引数。

### 戻り値

(`number`): タイマーID。

## 例

```typescript
defer(text => {
  console.log(text);
}, 'deferred');
// => Logs 'deferred' after the current call stack has cleared.
```
