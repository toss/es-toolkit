# isBlob

指定された値が`Blob`であるかどうかをチェックします。

この関数はTypeScriptで型述語としても機能し、引数の型を`Blob`に絞り込みます。

## シグネチャ

```typescript
function isBlob(x: unknown): x is Blob;
```

### パラメータ

- `x` (`unknown`): Blobであるかどうかを確認する値。

### 戻り値

(`x is Blob`): 値がBlobであれば`true`、そうでなければ`false`。

## 例

```typescript
const value1 = new Blob();
const value2 = {};
const value3 = new File(['content'], 'example.txt', { type: 'text/plain' });

console.log(isBlob(value1)); // true
console.log(isBlob(value2)); // false
console.log(isBlob(value3)); // true
```
