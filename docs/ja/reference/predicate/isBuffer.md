# isBuffer

与えられた値が Buffer インスタンスかどうかを確認します。

```typescript
const result = isBuffer(value);
```

## 使用法

### `isBuffer(value)`

Node.js 環境で Buffer オブジェクトかどうかを確認したい場合に `isBuffer` を使用してください。ファイル処理、ネットワーク通信、バイナリデータ操作時に便利です。TypeScript で型ガードとして動作し、値の型を `Buffer` に絞り込みます。

```typescript
import { isBuffer } from 'es-toolkit/predicate';

// Buffer インスタンスの確認
const buffer = Buffer.from('hello world', 'utf8');
isBuffer(buffer); // true

// 他の型との区別
isBuffer('hello world'); // false
isBuffer(new Uint8Array([1, 2, 3])); // false
isBuffer(new ArrayBuffer(8)); // false
```

TypeScript で型ガードとして使用する場合に特に便利です。

```typescript
import { isBuffer } from 'es-toolkit/predicate';

function processData(data: unknown) {
  if (isBuffer(data)) {
    // data は Buffer に型が絞り込まれます
    console.log(`Buffer サイズ: ${data.length} バイト`);
    console.log(`Buffer 内容: ${data.toString('utf8')}`);

    // Buffer のメソッドを安全に使用できます
    const slice = data.slice(0, 10);
  }
}
```

ファイル処理やネットワーク通信でよく使用されます。

```typescript
import { isBuffer } from 'es-toolkit/predicate';

// ファイルデータの処理
function readFileData(data: unknown) {
  if (isBuffer(data)) {
    const text = data.toString('utf8');
    const header = data.readUInt32BE(0);
    console.log('ファイル内容:', text);
  }
}

// ネットワークデータの処理
function handleNetworkData(chunk: unknown) {
  if (isBuffer(chunk)) {
    console.log(`受信データサイズ: ${chunk.length} バイト`);
    const processed = Buffer.concat([chunk, Buffer.from('\n')]);
    return processed;
  }
  return null;
}
```

#### パラメータ

- `value` (`unknown`): Buffer インスタンスかどうかを確認する値です。

#### 戻り値

(`boolean`): 値が Buffer インスタンスの場合は `true`、そうでなければ `false` を返します。
