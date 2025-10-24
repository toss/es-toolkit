# isBlob

与えられた値が Blob インスタンスかどうかを確認します。

```typescript
const result = isBlob(value);
```

## 参照

### `isBlob(value)`

値が Blob インスタンスかどうかを確認したい場合に `isBlob` を使用してください。ブラウザ環境でファイルやバイナリデータを扱う際に便利です。

```typescript
import { isBlob } from 'es-toolkit/predicate';

// 基本的な Blob インスタンス
const blob = new Blob(['hello'], { type: 'text/plain' });
const file = new File(['content'], 'example.txt', { type: 'text/plain' });

console.log(isBlob(blob)); // true
console.log(isBlob(file)); // true (File は Blob を継承します)

// Blob でない値
console.log(isBlob(new ArrayBuffer(8))); // false
console.log(isBlob('text data')); // false
console.log(isBlob({})); // false
console.log(isBlob(null)); // false
```

ファイル処理や API レスポンスの検証に便利です。

```typescript
import { isBlob } from 'es-toolkit/predicate';

// ファイルアップロードの処理
function processUploadedFile(file: unknown) {
  if (isBlob(file)) {
    // TypeScript が file を Blob として推論します
    console.log(`ファイルサイズ: ${file.size} バイト`);
    console.log(`MIME タイプ: ${file.type}`);

    // Blob のメソッドを安全に使用できます
    file.text().then(text => console.log('内容:', text));
  } else {
    console.log('有効なファイルではありません');
  }
}

// ダウンロード機能の実装
async function handleDownload(data: unknown, filename: string) {
  if (isBlob(data)) {
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
```

#### パラメータ

- `value` (`unknown`): Blob インスタンスかどうかを確認する値です。

#### 戻り値

(`value is Blob`): 値が Blob インスタンスの場合は `true`、そうでなければ `false` を返します。
