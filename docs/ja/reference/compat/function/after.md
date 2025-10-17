# after (Lodash 互換性)

::: warning `es-toolkit` の [`after`](../../function/after.md) を使用してください

この `after` 関数は、複雑な型検証と整数変換処理により動作が遅くなります。

代わりに、より高速でモダンな `es-toolkit` の [after](../../function/after.md) を使用してください。

:::

指定された回数呼び出された後にのみ実行される関数を作成します。

```typescript
const restrictedFunction = after(n, func);
```

## 参照

### `after(n, func)`

関数が特定の回数呼び出された後にのみ実行されるように制限したい場合は、`after` を使用してください。複数の非同期操作が完了した後にコールバックを実行したり、初期化段階を経た後に関数を有効化する際に便利です。

```typescript
import { after } from 'es-toolkit/compat';

// 基本的な使用法
const logAfterThree = after(3, () => {
  console.log('3回目の呼び出しから実行されます!');
});

logAfterThree(); // 実行されない
logAfterThree(); // 実行されない
logAfterThree(); // "3回目の呼び出しから実行されます!" が出力される
logAfterThree(); // "3回目の呼び出しから実行されます!" が出力される (実行が続く)
```

複数の非同期操作がすべて完了した後に特定のコールバックを実行する際にも使用できます。

```typescript
import { after } from 'es-toolkit/compat';

const tasks = ['task1', 'task2', 'task3'];
const allTasksComplete = after(tasks.length, () => {
  console.log('すべてのタスクが完了しました!');
});

// 各タスクが完了するたびに呼び出される
tasks.forEach(task => {
  performAsyncTask(task, () => {
    console.log(`${task} 完了`);
    allTasksComplete(); // 3回目の呼び出しで "すべてのタスクが完了しました!" が出力される
  });
});
```

0または負の数を渡すと、最初の呼び出しからすぐに実行されます。

```typescript
import { after } from 'es-toolkit/compat';

const immediate = after(0, () => console.log('すぐに実行'));
immediate(); // "すぐに実行"

const negative = after(-1, () => console.log('すぐに実行'));
negative(); // "すぐに実行"
```

#### パラメータ

- `n` (`number`): 関数が実行される前に必要な呼び出し回数です。
- `func` (`TFunc`): 制限する関数です。

#### 戻り値

(`TFunc`): n回目の呼び出しから元の関数を実行する新しい制限された関数を返します。
