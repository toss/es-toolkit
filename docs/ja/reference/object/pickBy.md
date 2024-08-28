# pickBy

条件関数に合致するプロパティで構成された新しいオブジェクトを生成します。

この関数はオブジェクトと条件関数を受け取り、条件関数がtrueを返すプロパティのみを含む新しいオブジェクトを返します。

## インターフェース

```typescript
function pickBy<T extends Record<string, any>>(
  obj: T,
  shouldPick: (value: T[keyof T], key: keyof T) => boolean
): Partial<T>;
```

### パラメータ

- `obj` (`T`): プロパティを選択するオブジェクトです。
- `shouldPick` (`(value: T[keyof T], key: keyof T) => boolean`): プロパティを選択するかどうかを決定する条件関数です。この関数はプロパティのキーと値を引数として受け取り、プロパティを選択する場合はtrue、そうでない場合はfalseを返します。

### 戻り値

(`Partial<T>`): 条件関数に合致するプロパティで構成された新しいオブジェクトです。

## 例

```typescript
const obj = { a: 1, b: 'pick', c: 3 };
const shouldPick = (value, key) => typeof value === 'string';
const result = pickBy(obj, shouldPick);
// 結果は次のようになります { b: 'pick' }
```
