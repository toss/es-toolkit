# set

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定されたパスに与えられた値を設定します。パスの一部が存在しない場合は作成されます。

## インターフェース

```typescript
function set<T extends object>(
  obj: T,
  path: string | number | symbol | Array<string | number | symbol>,
  value: unknown
): T;
```

### パラメータ

- `obj` (`T`): 値を設定するオブジェクト。
- `path` (`string | number | symbol | Array<string | number | symbol>`): 値を設定するプロパティのパス。
- `value` (`unknown`): 設定する値。

### 戻り値

(`T`): 修正されたオブジェクトを返します。T を指定しない場合は unknown です。

## 例

```typescript
import { set } from 'es-toolkit/compat';

// ネストされたオブジェクトに値を設定
const obj = { a: { b: { c: 3 } } };
set(obj, 'a.b.c', 4);
console.log(obj.a.b.c); // 4

// 配列に値を設定
const arr = [1, 2, 3];
set(arr, 1, 4);
console.log(arr[1]); // 4

// 存在しないパスを作成して値を設定
const obj2 = {};
set(obj2, 'a.b.c', 4);
console.log(obj2); // { a: { b: { c: 4 } } }

// インターフェースの使用
interface O {
  a: number;
}
const obj3 = {};
const result = set<O>(obj3, 'a', 1); // result の型 = { a: number }
console.log(result); // { a: 1 }
```
