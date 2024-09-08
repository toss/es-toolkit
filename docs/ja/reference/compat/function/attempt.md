# attempt

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

提供された引数で関数を実行します。
関数がエラーをスローした場合、エラーをキャッチして返します。

キャッチされたエラーが`Error`のインスタンスでない場合、新しい`Error`にラップします。

## インターフェース

```typescript
function attempt<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): ReturnType<F> | Error;
```

### パラメータ

- `func` (`F`): 実行される関数。
- `args` (`...Parameters<F>`): 関数に渡す引数。

### 戻り値

(`ReturnType<F> | Error`): 成功した場合は関数の戻り値、または例外がスローされた場合はエラー。

## 例

```typescript
// Example 1: Successful execution
const result = attempt((x, y) => x + y, 2, 3);
console.log(result); // Output: 5

// Example 2: Function throws an error
const errorResult = attempt(() => {
  throw new Error('Something went wrong');
});
console.log(errorResult); // Output: Error: Something went wrong

// Example 3: Non-Error thrown
const nonErrorResult = attempt(() => {
  throw 'This is a string error';
});
console.log(nonErrorResult); // Output: Error: This is a string error
```
