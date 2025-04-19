# isWindow

この関数は、指定された要素が `Window` オブジェクトかどうかを確認します。
要素が `Window` オブジェクトであれば `true`、そうでなければ `false` を返します。

TypeScriptの型ガードとしてよく使用され、パラメーターとして渡された要素を `Window` 型に絞り込むことができます。

## インターフェース

```typescript
function isWindow(element: unknown): element is Window;
```

### パラメータ

- `element` (`unknown`): `Window` オブジェクトかどうかを確認する要素。

### 返り値

(`element is Window`): 要素が `Window` オブジェクトであれば `true`、そうでなければ `false`.

## 例

```typescript
console.log(isWindow(window)); // true
console.log(isWindow(document)); // false
console.log(isWindow({})); // false
```
