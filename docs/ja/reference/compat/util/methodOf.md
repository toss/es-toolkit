# methodOf

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定された`object`のパスにあるメソッドを、提供された引数で呼び出す関数を作成します。

## インターフェース

```typescript
function methodOf(object: object, ...args: any[]): (path: PropertyKey | PropertyKey[]) => any;
```

### パラメータ

- `object` (`object`): 要検索のオブジェクト。
- `args` (`...any`): メソッドを呼び出す際に使用する引数。

### 戻り値

(`(path: PropertyKey | PropertyKey[]) => any`): パスを受け取り、`object` の `path` で `args` でメソッドを呼び出す新しい関数。

## 例

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

const add = methodOf(object, 1, 2);
console.log(add('a.b')); // => 3
```
