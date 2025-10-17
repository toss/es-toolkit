# values (Lodash 互換性)

::: warning `Object.values` を使用してください

この `values` 関数は単に `Object.values` を呼び出すだけで、不必要なオーバーヘッドがあります。

代わりに、より高速で現代的な `Object.values()` を直接使用してください。

:::

オブジェクトの自身の列挙可能なプロパティ値の配列を返します。

```typescript
const valueArray = values(object);
```

## インターフェース

```typescript
function values<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function values<T>(arr: ArrayLike<T>): T[];
function values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### パラメータ

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): プロパティ値を取得するオブジェクト。

### 戻り値

(`T[]`): プロパティ値の配列。

## 例

```typescript
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]
```
