# setWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`customizer` 関数を使用して、指定されたオブジェクトの特定のパスに値を設定します。
パスの一部が存在しない場合は、`customizer` の結果に基づいて作成されます。

この関数は [set](./set.md) と似ていますが、ネストされたオブジェクトを作成するための `customizer` を受け入れる点が異なります。

`customizer` はパスのオブジェクトを生成するために呼び出されます。
`customizer` が値を返す場合、その値が現在のパスセグメントに使用されます。
`customizer` が `undefined` を返す場合、このメソッドはパスに基づいて適切なオブジェクトを作成します。
次のパスセグメントが有効な配列インデックスである場合は配列を、そうでない場合はオブジェクトを作成します。

## インターフェース

```typescript
function setWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  value: unknown,
  customizer?: (value: unknown) => unknown
): T;
```

### パラメータ

- `obj` (`T`): 変更するオブジェクト。
- `path` (`PropertyKey | readonly PropertyKey[]`): 値を設定するプロパティのパス。
- `value` (`unknown`): 設定する値。
- `customizer` (`(value: unknown) => unknown`): パス作成をカスタマイズする関数。

### 戻り値

(`T`): 変更されたオブジェクトを返します。

## 例

```typescript
import { setWith } from 'es-toolkit/compat';
import { isObject } from 'es-toolkit/compat';

// カスタマイザーを使用してネストされた配列に値を設定
const object = {};
setWith(object, '[0][1][2]', 3, value => (isObject(value) ? undefined : {}));
console.log(object); // => { '0': { '1': { '2': 3 } } }

// 配列用のオブジェクトを作成するために Object をカスタマイザーとして使用
const obj2 = {};
setWith(obj2, 'a[0].b.c', 4, Object);
console.log(obj2); // => { a: [{ b: { c: 4 } }] }

// カスタマイザーなしでパスを作成（set を使用するのと同じ）
const obj3 = {};
setWith(obj3, 'a.b.c', 4);
console.log(obj3); // => { a: { b: { c: 4 } } }
```
