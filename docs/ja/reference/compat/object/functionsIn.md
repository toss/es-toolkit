# functionsIn

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](mdc:../../../compatibility.md)します。
:::

オブジェクトの独自プロパティと継承された列挙可能なプロパティから、関数プロパティ名の配列を生成します。

## インターフェース

```typescript
function functionsIn(object: any): string[];
```

### パラメータ

- `object`: 検査するオブジェクト。

### 戻り値

(`string[]`): オブジェクトの独自プロパティと継承された列挙可能なプロパティから、関数プロパティ名の配列を返します。

## 例

```typescript
import { functionsIn } from 'es-toolkit/compat';

function Foo() {
  this.a = function () {
    return 'a';
  };
  this.b = function () {
    return 'b';
  };
}

Foo.prototype.c = function () {
  return 'c';
};

// 継承された関数を含む関数プロパティ名を取得
functionsIn(new Foo());
// => ['a', 'b', 'c']

// プレーンオブジェクトでも動作
const object = {
  a: function () {
    return 'a';
  },
  b: function () {
    return 'b';
  },
};

functionsIn(object);
// => ['a', 'b']

// オブジェクト以外の場合は空配列を返す
functionsIn(null);
// => []
functionsIn(undefined);
// => []
functionsIn(1);
// => []
```
