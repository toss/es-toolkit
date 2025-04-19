# setWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

カスタマイザー関数を使用して、指定されたパスに値を設定します。このメソッドは、ネストされたオブジェクトを作成するためのカスタマイザーを受け入れる点で `set` とは異なります。

カスタマイザーが `undefined` を返す場合、パスの作成はこのメソッドによって処理されます。カスタマイザーは3つの引数（nsValue、key、nsObject）で呼び出されます。

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
