# isFile

指定された値が`File`であるかどうかをチェックします。

この関数はTypeScriptで型述語としても機能し、引数の型を`File`に絞り込みます。

## シグネチャ

```typescript
function isFile(x: unknown): x is File;
```

### パラメータ

- `x` (`unknown`): `File`であるかどうかを確認する値。

### 戻り値

(`x is File`): 値が`File`であれば`true`、そうでなければ`false`。

## 例

```typescript
const file = new File(['content'], 'example.txt', { type: 'text/plain' });
const blob = new Blob(['content'], { type: 'text/plain' });
const value = {};

console.log(isFile(file)); // true
console.log(isFile(blob)); // false
console.log(isFile(value)); // false
```
