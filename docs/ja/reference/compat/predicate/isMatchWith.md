# isMatchWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

このメソッドは `isMatch` に似ていますが、値を比較するために呼び出される `customizer` を受け取ります。`customizer` が `undefined` を返す場合、比較はメソッドによって処理されます。`customizer` は5つの引数で呼び出されます：(objValue, srcValue, index|key, object, source)。

## インターフェース

```typescript
function isMatchWith(
  target: unknown,
  source: unknown,
  customizer?: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => unknown
): boolean;
```

### パラメータ

- `target` (`unknown`): 検査するオブジェクト。
- `source` (`unknown`): 一致させるプロパティ値のオブジェクト。
- `customizer` (`Function`, オプション): 比較をカスタマイズする関数。

### 戻り値

(`boolean`): オブジェクトが一致する場合は `true`、そうでなければ `false` を返します。

## 例

```typescript
import { isMatchWith } from 'es-toolkit/compat';

function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}

function customizer(objValue, srcValue) {
  if (isGreeting(objValue) && isGreeting(srcValue)) {
    return true;
  }
}

const object = { greeting: 'hello' };
const source = { greeting: 'hi' };

isMatchWith(object, source, customizer);
// => true
```
