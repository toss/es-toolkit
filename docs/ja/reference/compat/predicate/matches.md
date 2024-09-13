# matches

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`source` の形と値と一致するかどうかを確認する関数を作成します。
オブジェクト、配列、`Map`、`Set` との深い比較をサポートします。

この関数の動作は [isMatch](./isMatch.md) と同じで、呼び出し方法のみが異なります。

## インターフェース

```typescript
function matches(source: unknown): (target: unknown) => boolean;
```

## パラメータ

- `source` (`unknown`): 確認する関数が参照するオブジェクト。

## 戻り値

- (`(target: unknown) => boolean`): `source` の形と値と一致するかどうかを確認する関数。`target` が `source` と一致すると `true`、さもなくば `false` を返します。

## 例

### オブジェクトの一致

```typescript
const matcher = matches({ a: 1, b: 2 });
matcher({ a: 1, b: 2, c: 3 }); // true
matcher({ a: 1, c: 3 }); // false
```

### 配列の一致

```typescript
const arrayMatcher = matches([1, 2, 3]);
arrayMatcher([1, 2, 3, 4]); // true
arrayMatcher([4, 5, 6]); // false
```

### ネストされた構造の一致

```typescript
// Matching objects with nested structures
const nestedMatcher = matches({ a: { b: 2 } });
nestedMatcher({ a: { b: 2, c: 3 } }); // true
nestedMatcher({ a: { c: 3 } }); // false
```
