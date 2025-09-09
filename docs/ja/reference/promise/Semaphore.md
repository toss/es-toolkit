# Semaphore

同時に実行される非同期タスクの数を制限するために使用できるセマフォです。

- `acquire` メソッドを実行すると、許可を得て非同期タスクを実行するか、許可が得られるまで待機します。
- `release` メソッドを実行すると、待機中の次のタスクが実行できるようになります。

このセマフォは、`acquire` を実行した順序に従って、先着順で非同期タスクを実行します。

## インターフェース

```typescript
class Semaphore {
  public capacity: number;
  public available: number;

  constructor(capacity: number);

  acquire(): Promise<void>;
  release(): void;
}
```

## プロパティ

- `capacity` (`number`): 同時に実行できるタスクの最大数。
- `available` (`number`): 現在残っている実行可能なタスクの数。

## メソッド

- `acquire` (`() => Promise<void>`): 許可を取得して非同期タスクを実行するか、許可が得られるまで待機します。
- `release` (`() => void`): 待機中の次のタスクが実行できるようになります。

## 例

```typescript
const sema = new Semaphore(2);

async function task() {
  await sema.acquire();
  try {
    // This code can only be executed by two tasks at the same time
  } finally {
    sema.release();
  }
}

task();
task();
task(); // This task will wait until one of the previous tasks releases the semaphore.
```
