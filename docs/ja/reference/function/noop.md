# noop

何もしない空の関数です。

```typescript
noop();
```

::: info [`asyncNoop`](./asyncNoop.md) 関数

非同期で何もしない関数が必要な場合は、直接`Promise<void>`を返す`asyncNoop`関数を使用してください。

:::

## 使用法

### `noop()`

何の動作もしない関数が必要なときに`noop`を使用してください。

関数が必須の場所でデフォルト値として使用したり、コールバック関数を無効化したいときに便利です。プレースホルダーの役割や初期化段階でよく使用されます。

```typescript
import { noop } from 'es-toolkit/function';

// 選択的なコールバックのデフォルト値として使用
interface EventHandlers {
  onSuccess?: () => void;
  onError?: () => void;
}

function processData({ onSuccess = noop, onError = noop }: EventHandlers = {}) {
  try {
    // データ処理ロジック
    console.log('データ処理完了');
    onSuccess(); // 安全に呼び出し可能
  } catch (error) {
    onError(); // 安全に呼び出し可能
  }
}

// undefinedチェックなしで安全に使用
processData({
  onSuccess: () => console.log('成功!'),
  // onErrorはnoopとしてデフォルト処理される
});
```

配列のメソッドでも使用できます。

```typescript
import { noop } from 'es-toolkit/function';

// 条件付きで関数を実行
const operations = [
  () => console.log('最初の作業'),
  shouldRunSecond ? () => console.log('2番目の作業') : noop,
  () => console.log('3番目の作業'),
];

operations.forEach(op => op()); // すべての作業を安全に実行
```

#### 戻り値

(`void`): 何も返しません。
