# isBuffer

指定された値がBufferのインスタンスかどうかをチェックします。

値がBufferの場合は`true`を返し、それ以外の場合は`false`を返します。

## インターフェース

```typescript
function isBuffer(x: unknown): boolean;
```

### パラメータ

- `x` (`unknown`): Bufferかどうかをチェックする値。

### 戻り値

(`boolean`): `x`がBufferの場合は`true`、それ以外の場合は`false`。

## 例

```typescript
const buffer = Buffer.from('test');
console.log(isBuffer(buffer)); // true

const notBuffer = 'not a buffer';
console.log(isBuffer(notBuffer)); // false
```
