# mapValues

値を `getNewValue` 関数が返す値に置き換えた新しいオブジェクトを返します。キーは元のオブジェクトのキーと同じです。

## Signature

```typescript
function mapValues<T extends Record<PropertyKey, unknown>, K extends keyof T, V>(
  object: T,
  getNewValue: (value: T[K], key: K, object: T) => V
): Record<K, V>;
```

### Parameters

- `obj` (`T extends Record<PropertyKey, unknown>`): 値を置き換えるオブジェクト。
- `getNewValue`: (`(value: T[K], key: K, object: T) => V`): 新しい値を生成する関数。

### Return Value

(`Record<K, V>`): 新しくマッピングされたオブジェクト。

## Examples

```typescript
const obj = { a: 1, b: 2 };
const result = mapValues(obj, value => value * 2);
console.log(result); // { a: 2, b: 4 }
```
