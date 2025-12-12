# Mutex

複数の非同期タスクが同時に実行されないよう順序を守ります。

```typescript
const mutex = new Mutex();
```

## 使用法

### `Mutex()`

複数の非同期タスクが同時に実行されることを防ぎたい場合に`Mutex`を使用します。データベース接続、ファイルシステムアクセス、API呼び出し制限など、同時実行を制御する必要がある状況で便利です。

```typescript
import { Mutex } from 'es-toolkit';

const mutex = new Mutex();

// API呼び出し制限の例
async function callAPI() {
  await mutex.acquire();
  try {
    // 同時に複数のAPI呼び出しが発生することを防止
    const response = await fetch('/api/data');
    return response.json();
  } finally {
    mutex.release();
  }
}

// ファイルシステムアクセスの例
async function writeToFile(data: string) {
  await mutex.acquire();
  try {
    // 同時に同じファイルへの書き込み操作が発生することを防止
    await fs.writeFile('data.txt', data);
    console.log('ファイル書き込み完了');
  } finally {
    mutex.release();
  }
}

// 複数のタスクを同時に呼び出しても順次実行される
callAPI();
callAPI(); // 最初のタスクが終わるまで待機
writeToFile(); // 前のタスクが終わるまで待機
```

#### プロパティ

- `isLocked` (`boolean`): 現在ミューテックスが使用中かどうか。`true`の場合、すでに実行中の非同期タスクがあることを意味します。

#### メソッド

- `acquire` (`() => Promise<void>`): 許可を得て非同期タスクを実行するか、許可を得られるまで待機します。
- `release` (`() => void`): 待機中の次のタスクが実行できるようにします。
