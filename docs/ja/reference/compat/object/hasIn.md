# hasIn

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトが指定されたパスに対応するプロパティを持っているかどうかを確認します。継承されたプロパティも含めて確認します。

パスとしては、オブジェクトのプロパティ名、プロパティ名の配列、または深いパスを表す文字列を使用できます。

`has` 関数はオブジェクト自身のプロパティのみを確認しますが、`hasIn` はプロトタイプチェーンのプロパティも確認します。

パスがインデックスを表し、オブジェクトが配列または `arguments` オブジェクトの場合、そのインデックスが有効か（0以上で長さ未満か）を確認します。そのため、すべてのインデックスが定義されていないスパース配列（Sparse array）にも使用できます。

## インターフェース

```typescript
function hasIn(object: unknown, path: string | number | symbol | Array<string | number | symbol>): boolean;
```

### パラメータ

- `object` (`unknown`): プロパティの存在を確認するオブジェクト。
- `path` (`string`, `number`, `symbol`, `Array<string | number | symbol>`): プロパティの存在を確認するパス。プロパティ名、プロパティ名の配列、または深いパスを表す文字列を使用できます。

### 戻り値

(`boolean`): オブジェクトがパスに値を持っている場合（自身のプロパティであれ継承されたプロパティであれ）は `true`、そうでない場合は `false`。

## 例

```typescript
import { has, hasIn } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

hasIn(obj, 'a'); // true
hasIn(obj, ['a', 'b']); // true
hasIn(obj, ['a', 'b', 'c']); // true
hasIn(obj, 'a.b.c'); // true
hasIn(obj, 'a.b.d'); // false
hasIn(obj, ['a', 'b', 'c', 'd']); // false

// 継承されたプロパティの例:
function Rectangle() {}
Rectangle.prototype.area = function () {};

const rect = new Rectangle();
hasIn(rect, 'area'); // true - hasInは継承されたプロパティも確認します
has(rect, 'area'); // false - hasは自身のプロパティのみを確認します
```

## デモ

::: sandpack

```ts index.ts
import { has, hasIn } from 'es-toolkit/compat';

// 継承されたプロパティの例
function Rectangle() {
  this.width = 10;
  this.height = 5;
}
Rectangle.prototype.area = function () {
  return this.width * this.height;
};

const rect = new Rectangle();

console.log('hasIn(rect, "area"):', hasIn(rect, 'area')); // true - 継承されたプロパティも確認します
console.log('has(rect, "area"):', has(rect, 'area')); // false - 自身のプロパティのみを確認します
console.log('hasIn(rect, "width"):', hasIn(rect, 'width')); // true - 自身のプロパティ
```

:::
