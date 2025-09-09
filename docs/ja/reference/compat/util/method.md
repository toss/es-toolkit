# method

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定されたオブジェクトの`path`でメソッドを、提供された引数で呼び出す関数を作成します。

## インターフェース

```typescript
function method(path: PropertyKey | PropertyKey[], ...args: any[]): (object?: unknown) => any;
```

### パラメータ

- `path` (`PropertyKey | PropertyKey[]`): 呼び出すメソッドのパス。
- `args` (`...any`): メソッドを呼び出す引数。

### 戻り値

(`(object?: unknown) => any`): オブジェクトを受け取り、その`path`でメソッドを`args`で呼び出す新しい関数。

## 例

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

const add = method('a.b', 1, 2);
console.log(add(object)); // => 3
```
