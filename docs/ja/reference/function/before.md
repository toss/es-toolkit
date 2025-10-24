# before

関数の呼び出し回数を制限する新しい関数を作成します。

```typescript
const limitedFunc = before(n, func);
```

## 参照

### `before(n, func)`

関数が特定の回数まで実行されるように制限したいときに`before`を使用してください。`n-1`回目の呼び出しまで関数が実行され、`n`回目からは実行されなくなります。

```typescript
import { before } from 'es-toolkit/function';

const beforeFn = before(3, () => {
  console.log('実行されました');
});

// '実行されました'をログ出力します
beforeFn();

// '実行されました'をログ出力します
beforeFn();

// 何もログ出力しません
beforeFn();

// 何もログ出力しません
beforeFn();
```

初期化や設定のように一度だけ実行されるべき作業に便利です。

```typescript
let initialized = false;

const initialize = before(2, () => {
  console.log('初期化中...');
  initialized = true;
});

// '初期化中...'をログ出力して初期化を実行します
initialize();

// すでに初期化されているので何もしません
initialize();
```

#### パラメータ

- `n` (`number`): 返される関数が`func`を呼び出せる最大回数です。`n`が0の場合、`func`は呼び出されません。正の整数の場合、最大`n-1`回呼び出されます。
- `func` (`F`): 呼び出し回数が制限される関数です。

#### 戻り値

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 呼び出し回数を追跡し、`n-1`回目まで`func`を実行する新しい関数です。`n`回目以降の呼び出しでは`undefined`を返します。

#### エラー

`n`が整数でない場合や負数の場合はエラーを発生させます。
