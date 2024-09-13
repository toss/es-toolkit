# omit

特定のキーを省略した新しいオブジェクトを生成します。

この関数はオブジェクトとキーの配列を受け取り、指定されたキーに対応するプロパティを除いた新しいオブジェクトを返します。

## インターフェース

```typescript
function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
```

### パラメータ

- `obj` (`T`): キーを省略するオブジェクトです。
- `keys` (`K[]`): オブジェクトから省略するキーの配列です。

### 戻り値

(`Omit<T, K>`): 指定されたキーが省略された新しいオブジェクトです。

## 例

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = omit(obj, ['b', 'c']);
// 結果は次のようになります { a: 1 }
```
