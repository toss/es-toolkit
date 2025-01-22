# invoke

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`object`の`path`で指定されたメソッドを、指定された引数で呼び出します。

## インターフェース

```typescript
function invoke(object: unknown, path: PropertyKey | PropertyKey[], args: any[]): any;
```

### パラメータ

- `object` (`unknown`): 問い合わせするオブジェクト。
- `path` (`PropertyKey | PropertyKey[]`): 呼び出すメソッドのパス。
- `args` (`any[]`): メソッドを呼び出すときに使用する引数。

### 戻り値

(`any`): 呼び出されたメソッドの結果。

## 例

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

invoke(object, 'a.b', [1, 2]); // => 3
invoke(object, ['a', 'b'], [1, 2]); // => 3
```
