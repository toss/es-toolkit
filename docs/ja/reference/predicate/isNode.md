# isNode

現在の実行環境がNode.jsであるかを確認します。

```typescript
const result = isNode();
```

## 参照

### `isNode()`

現在のコードがNode.js環境で実行されているかを確認したい場合は、`isNode`を使用してください。Node.js専用のAPIを使用する前に環境を確認する際に便利です。

```typescript
import { isNode } from 'es-toolkit/predicate';

if (isNode()) {
  // Node.js専用コード
  console.log('このコードはNode.jsで実行されています');
  const fs = await import('node:fs');
  const path = await import('node:path');
} else {
  // ブラウザ環境でのみ使用可能なコード
  console.log('このコードはブラウザで実行されています');
  const response = await fetch('/api/data');
}
```

条件付きでNode.jsモジュールを使用する場合にも便利です：

```typescript
function getEnvironmentInfo() {
  if (isNode()) {
    return {
      platform: process.platform,
      nodeVersion: process.version,
      environment: 'Node.js'
    };
  } else {
    return {
      userAgent: navigator.userAgent,
      environment: 'Browser'
    };
  }
}
```

#### 戻り値

(`boolean`): 現在の環境がNode.jsの場合は`true`、そうでない場合は`false`を返します。
