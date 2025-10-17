# unset (Lodash 互換性)

::: warning `delete` 演算子を使用してください

この `unset` 関数は複雑なパス解析とネストされたオブジェクト処理により遅く動作します。

代わりに、より高速で現代的な `delete` 演算子を直接使用してください。

:::

オブジェクトの指定されたパスにあるプロパティを削除します。

```typescript
const success = unset(object, path);
```

## インターフェース

```typescript
function unset(obj: any, path: PropertyKey | PropertyKey[]): boolean;
```

### パラメータ

- `obj` (`any`): 変更するオブジェクトです。
- `path` (`PropertyKey | PropertyKey[]`): 削除するプロパティのパスです。

#### 戻り値

(`boolean`): プロパティが削除された場合は true を返し、それ以外の場合は false を返します。

## 例

```typescript
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // true
console.log(obj); // { a: { b: {} } }

const obj = { a: { b: { c: 42 } } };
unset(obj, ['a', 'b', 'c']); // true
console.log(obj); // { a: { b: {} } }
```
