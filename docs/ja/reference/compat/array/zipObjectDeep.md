# zipObjectDeep

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替となるネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

2つの配列を1つのオブジェクトに結合します。最初の配列はプロパティパスを表し、2番目の配列は値を表します。[zipObject](../../array/zipObject.md) とは異なり、プロパティとして `a.b` のようなパスを指定できます。

プロパティ名を表す配列が値を表す配列よりも長い場合、値は `undefined` で埋められます。

## インターフェース

```typescript
function zipObjectDeep<P extends string | number | symbol, V>(keys: P[], values: V[]): { [K in P]: V };
```

### パラメータ

- `keys` (`P[]`): プロパティパスを含む配列。
- `values` (`V[]`): 対応する値を含む配列。

### 戻り値

(`{ [K in P]: V }`): 与えられたプロパティ名と値で構成される新しいオブジェクトです。

## 例

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result は { a: { b: { c: 1 } }, d: { e: { f: 2 } } } になります

const paths = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result は { a: { b: { c: 1 } }, d: { e: { f: 2 } } } になります

const paths = ['a.b[0].c', 'a.b[1].d'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// result は { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } } になります
```

## パフォーマンス比較

|                   | [Bundle Size](../../../bundle-size.md) | [Performance](../../../performance.md) |
| ----------------- | -------------------------------------- | -------------------------------------- |
| es-toolkit/compat | 938 bytes (88% smaller)                | 1,102,767 times (25% slower)           |
| lodash-es         | 7,338 bytes                            | 1,476,660 times                        |
