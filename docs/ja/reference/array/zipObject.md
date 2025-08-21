# zipObject

2つの配列を1つのオブジェクトに結合します。最初の配列はプロパティ名を表し、2番目の配列は値を表します。

プロパティ名を表す配列が値を表す配列よりも長い場合、値は`undefined`で埋められます。

## インターフェース

```typescript
function zipObject<P extends PropertyKey, V>(keys: P[], values: V[]): Record<P, V>;
```

### パラメータ

- `keys` (`P[]`): プロパティ名が含まれる配列です。
- `values` (`V[]`): プロパティ名に対応する値が含まれる配列です。

### 戻り値

(`Record<P, V>`): 与えられたプロパティ名と値で構成される新しいオブジェクトです。

## 例

```typescript
const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];
const result = zipObject(keys, values);
// resultは { a: 1, b: 2, c: 3 } になります。

const keys2 = ['a', 'b', 'c'];
const values2 = [1, 2];
const result2 = zipObject(keys2, values2);
// result2は { a: 1, b: 2, c: undefined } になります。

const keys3 = ['a', 'b'];
const values3 = [1, 2, 3];
const result3 = zipObject(keys3, values3);
// result3は { a: 1, b: 2 } になります。
```
