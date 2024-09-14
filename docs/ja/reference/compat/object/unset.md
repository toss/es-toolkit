# unset

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定されたパスのプロパティをオブジェクトから削除します。

## インターフェース

```typescript
function unset(obj: unknown, path: PropertyKey | PropertyKey[]): boolean;
```

### パラメータ

- `obj` (`unknown`): 修正するオブジェクト。
- `path` (`PropertyKey | PropertyKey[]`): 削除するプロパティのパス。

### 戻り値

(`boolean`): プロパティが削除された場合は`true`を、それ以外の場合は`false`を返します。

## 例

```typescript
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // true
console.log(obj); // { a: { b: {} } }

const obj = { a: { b: { c: 42 } } };
unset(obj, ['a', 'b', 'c']); // true
console.log(obj); // { a: { b: {} } }
```
