# mapValues

値を `getNewValue` 関数が返す値に置き換えた新しいオブジェクトを返します。キーは元のオブジェクトのキーと同じです。

## インターフェース

```typescript
function mapValues<T extends object, K extends keyof T, V>(
  object: T,
  getNewValue: (value: T[K], key: K, object: T) => V
): Record<K, V>;
```

### パラメータ

- `obj` (`T extends object`): 値を置き換えるオブジェクト。
- `getNewValue`: (`(value: T[K], key: K, object: T) => V`): 新しい値を生成する関数。

### 戻り値

(`Record<K, V>`): `getNewValue` 関数が返す値に置き換えた新しいオブジェクト。

## 例

```typescript
const obj = { a: 1, b: 2 };
const result = mapValues(obj, value => value * 2);
console.log(result); // { a: 2, b: 4 }
```
