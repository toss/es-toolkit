# isFile

与えられた値が File オブジェクトかどうかを確認します。

```typescript
const result = isFile(value);
```

## 使用法

### `isFile(value)`

値が File インスタンスかどうかを確認したい場合に `isFile` を使用してください。File オブジェクトは、ユーザーがアップロードしたファイルやファイルシステムから取得したファイルを表す Web API の一部です。Blob オブジェクトとは異なり、ファイル名や最終更新時刻などの追加情報が含まれます。

```typescript
import { isFile } from 'es-toolkit/predicate';

// File オブジェクトの確認
const file = new File(['hello'], 'example.txt', { type: 'text/plain' });
console.log(isFile(file)); // true

// Blob オブジェクトは File ではありません
const blob = new Blob(['hello'], { type: 'text/plain' });
console.log(isFile(blob)); // false

// 一般的なオブジェクト
console.log(isFile({})); // false
console.log(isFile([])); // false
console.log(isFile('text')); // false
console.log(isFile(null)); // false
console.log(isFile(undefined)); // false
```

与えられた引数が有効なファイルかどうかを検証する際に使用できます。

```typescript
// ファイルアップロードハンドラー
function handleFileUpload(input: unknown) {
  if (isFile(input)) {
    console.log(`ファイル名: ${input.name}`);
    console.log(`ファイルサイズ: ${input.size} bytes`);
    console.log(`ファイルタイプ: ${input.type}`);
    console.log(`最終更新: ${input.lastModified}`);

    // File であることが確実なので、安全にファイル関連のプロパティにアクセスできます
    return input;
  }

  throw new Error('有効なファイルではありません');
}
```

JavaScript 実行環境で `File` がサポートされていない場合も安全に処理します。

```typescript
// Node.js 環境や File をサポートしていない環境でも安全
console.log(isFile(new Date())); // false

// File が定義されていない環境でもエラーが発生しません
if (typeof File === 'undefined') {
  console.log(isFile({})); // false
}
```

#### パラメータ

- `value` (`unknown`): File オブジェクトかどうかを確認する値です。

#### 戻り値

(`boolean`): 値が File オブジェクトの場合は `true`、そうでなければ `false` を返します。
