# invert

オブジェクトのキーと値を反転させた新しいオブジェクトを生成します。

この関数はオブジェクトを受け取り、そのオブジェクトのキーを値に、値をキーにした新しいオブジェクトを生成します。入力されたオブジェクトに重複した値がある場合、最後に登場したキーが新しいキーとして使用されます。

## インターフェース

```typescript
function invert<K extends string | number | symbol, V extends string | number | symbol>(
  obj: Record<K, V>
): { [key in V]: K };
```

### パラメータ

- `obj` (`Record<K, V>`): キーと値を反転させるオブジェクトです。

### 戻り値

(`{ [key in V]: K }`): キーと値が反転された新しいオブジェクトです。

## 例

```typescript
const obj = { a: 1, b: 1, c: 2 };
const result = invert(obj);
// 結果は次のようになります { 1: 'b', 2: 'c' }
```
