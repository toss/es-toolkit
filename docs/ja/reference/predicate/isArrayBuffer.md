# isArrayBuffer

与えられた値が `ArrayBuffer` インスタンスかどうかを確認します。

```typescript
const result = isArrayBuffer(value);
```

## 参照

### `isArrayBuffer(value)`

値が `ArrayBuffer` かどうかを確認したい場合に `isArrayBuffer` を使用してください。TypeScript で型ガードとしても活用できます。

```typescript
import { isArrayBuffer } from 'es-toolkit/predicate';

// ArrayBuffer インスタンスの確認
const buffer = new ArrayBuffer(16);
const notBuffer = new Array(16);

console.log(isArrayBuffer(buffer)); // true
console.log(isArrayBuffer(notBuffer)); // false

// バイナリデータ処理時に便利です
const data: unknown = getDataFromAPI();
if (isArrayBuffer(data)) {
  // TypeScript で data は ArrayBuffer に型が絞り込まれます
  const uint8View = new Uint8Array(data);
  console.log(`Buffer size: ${data.byteLength} bytes`);
}

// さまざまな型との比較
console.log(isArrayBuffer(new ArrayBuffer(8))); // true
console.log(isArrayBuffer(new Uint8Array(8))); // false
console.log(isArrayBuffer(new DataView(new ArrayBuffer(8)))); // false
console.log(isArrayBuffer([])); // false
console.log(isArrayBuffer({})); // false
console.log(isArrayBuffer(null)); // false
console.log(isArrayBuffer(undefined)); // false
```

ファイル処理やネットワーク通信でよく使用されます。

```typescript
import { isArrayBuffer } from 'es-toolkit/predicate';

// ファイル読み取り結果の処理
async function processFileData(file: File) {
  const result = await file.arrayBuffer();

  if (isArrayBuffer(result)) {
    console.log(`ファイルサイズ: ${result.byteLength} バイト`);

    // バイナリデータの処理
    const view = new DataView(result);
    const header = view.getUint32(0, true);
    console.log(`ファイルヘッダー: ${header.toString(16)}`);
  }
}

// WebSocket で受信したデータの確認
function handleWebSocketMessage(data: unknown) {
  if (isArrayBuffer(data)) {
    console.log('バイナリメッセージを受信しました');
    const bytes = new Uint8Array(data);
    // バイトデータの処理
  } else if (typeof data === 'string') {
    console.log('テキストメッセージを受信しました');
    // 文字列データの処理
  }
}
```

#### パラメータ

- `value` (`unknown`): `ArrayBuffer` かどうかを確認する値です。

#### 戻り値

(`value is ArrayBuffer`): 値が `ArrayBuffer` の場合は `true`、そうでなければ `false` を返します。
