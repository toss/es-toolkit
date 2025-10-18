# Semaphore

同時に実行される非同期タスクの数を制限します。

```typescript
const semaphore = new Semaphore(capacity);
```

## 参照

### `Semaphore(capacity)`

同時に実行できる非同期タスクの数を制限したい場合に`Semaphore`を使用します。特にデータベース接続プール、API呼び出し制限、ファイルダウンロード制限など、リソース使用量を制御する必要がある状況で便利です。

```typescript
import { Semaphore } from 'es-toolkit';

const semaphore = new Semaphore(3);

// API呼び出し制限の例(最大3つまで同時実行)
async function callAPI(id: number) {
  await semaphore.acquire();
  try {
    console.log(`API呼び出し開始: ${id}`);
    const response = await fetch(`/api/data/${id}`);
    return response.json();
  } finally {
    semaphore.release();
    console.log(`API呼び出し完了: ${id}`);
  }
}

// ファイルダウンロード制限の例
async function downloadFile(url: string) {
  await semaphore.acquire();
  try {
    console.log(`ダウンロード開始: ${url}`);
    // ファイルダウンロードロジック
    await fetch(url);
  } finally {
    semaphore.release();
    console.log(`ダウンロード完了: ${url}`);
  }
}

// 5つのタスクを同時に呼び出しても最大3つまでしか同時実行されない
callAPI(1);
callAPI(2);
callAPI(3);
callAPI(4); // 前のタスクのいずれかが終わるまで待機
callAPI(5); // 前のタスクのいずれかが終わるまで待機
```

#### パラメータ

- `capacity` (`number`): 同時に実行できるタスクの最大数です。1より大きい整数である必要があります。

#### プロパティ

- `capacity` (`number`): 同時に実行できるタスクの最大数です。
- `available` (`number`): 現在利用可能な許可の数です。`0`の場合、すべての許可が使用中であることを意味します。

#### メソッド

- `acquire` (`() => Promise<void>`): 許可を得て非同期タスクを実行するか、許可を得られるまで待機します。
- `release` (`() => void`): 許可を返却して、待機中の次のタスクが実行できるようにします。
