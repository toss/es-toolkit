# sample

配列を受け取り、その配列からランダムに選択された単一の要素を返します。

## インターフェース

```typescript
function sample<T>(arr: T[]): T;
```

### パラメータ

- `arr` (`T[]`): サンプリングする配列です。

### 戻り値

(`T`): 配列からランダムに選択された要素です。

## 例

```typescript
const array = [1, 2, 3, 4, 5];
const randomElement = sample(array);
// randomElementは配列からランダムに選択された要素の1つになります。
```
