# isArguments

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値が `arguments` オブジェクトかどうかを確認します。

この関数は、与えられた値が `arguments` オブジェクトであれば `true`、そうでなければ `false` を返します。

TypeScript の型ガードとして使用できます。パラメータとして与えられた値の型を `IArguments` に絞り込みます。

## インターフェース

```typescript
function isArguments(value?: unknown): value is IArguments;
```

### パラメータ

- `value` (`unknown`): `arguments` オブジェクトかどうかを確認する値です。

### 戻り値

(`value is IArguments`): 与えられた値が `arguments` オブジェクトであれば `true`、そうでなければ `false` を返します。

## 例

```typescript
import { isArguments } from 'es-toolkit/compat';

const args = (function () {
  return arguments;
})();
const strictArgs = (function () {
  'use strict';
  return arguments;
})();
const value = [1, 2, 3];

console.log(isArguments(args)); // true
console.log(isArguments(strictArgs)); // true
console.log(isArguments(value)); // false
```
