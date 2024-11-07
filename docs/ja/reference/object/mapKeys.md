# mapKeys

キーを `getNewKey` 関数が返すキーに置き換えた新しいオブジェクトを返します。値は元のオブジェクトの値と同じです。

## インターフェース

```typescript
function mapKeys<T extends Record<PropertyKey, any>, K extends PropertyKey>(
  object: T,
  getNewKey: (value: T[keyof T], key: keyof T, object: T) => K
): Record<K, T[keyof T]>;
```

### パラメータ

- `obj` (`T extends Record<PropertyKey, any>`): キーを置き換えるオブジェクト。
- `getNewKey`: (`(value: T[keyof T], key: keyof T, object: T) => K`): 新しいキーを生成する関数。

### 戻り値

(`Record<K, T[keyof T]>`): キーが置き換えられた新しいオブジェクト。

## 例

```typescript
const obj = { a: 1, b: 2 };
const result = mapKeys(obj, (value, key) => key + value);
console.log(result); // { a1: 1, b2: 2 }
```

## パフォーマンス比較

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 138 bytes (99.1% smaller)           | 2,844,013 times (11% faster)        |
| es-toolkit/compat | 1,124 bytes (93.2% smaller)         | 2,899,524 times (13% faster)        |
| lodash-es         | 16,649 bytes                        | 2,559,949 times                     |
