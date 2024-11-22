# isBuffer

指定された値がBufferのインスタンスかどうかをチェックします。

値がBufferの場合は`true`を返し、それ以外の場合は`false`を返します。

この関数はTypeScriptで型述語としても機能し、引数の型を `Buffer` に狭めます。

## インターフェース

```typescript
function isBuffer(x: unknown): x is Buffer;
```

### パラメータ

- `x` (`unknown`): Bufferかどうかをチェックする値。

### 戻り値

(`x is Buffer`): `x`がBufferの場合は`true`、それ以外の場合は`false`。
数値配列。

## 例

```typescript
const buffer = Buffer.from('test');
console.log(isBuffer(buffer)); // true

const notBuffer = 'not a buffer';
console.log(isBuffer(notBuffer)); // false
```
