# Mutex

非同期タスクが特定のコード領域で同時に一度だけ実行されるようにするためのミューテックス（Mutex）です。

## インターフェース

```typescript
class Mutex {
  isLocked: boolean;

  acquire(): Promise<void>;
  release(): void;
}
```

## プロパティ

- `isLocked` (`boolean`): 現在ミューテックスが使用中かどうかを確認します。`true`の場合、既に実行中の非同期タスクがあることを意味します。

## メソッド

- `acquire` (`() => Promise<void>`): ミューテックスを取得し、必要に応じて利用可能になるまでブロックします。
- `release` (`() => void`): ミューテックスを解放し、他の待機中のタスクが続行できるようにします。

## 例

```typescript
const mutex = new Mutex();

async function criticalSection() {
  await mutex.acquire();
  try {
    // This code section cannot be executed simultaneously
  } finally {
    mutex.release();
  }
}

criticalSection();
criticalSection(); // This call will wait until the first call releases the mutex.
```
