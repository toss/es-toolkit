# throttle

関数を指定された時間ごとに最大1回だけ実行されるように制限します。

```typescript
const throttledFunc = throttle(func, throttleMs, options);
```

## 使用法

### `throttle(func, throttleMs, options?)`

関数呼び出しを一定の時間間隔で制限したい場合は `throttle` を使用します。スクロール、リサイズ、マウス移動のように頻繁に発生するイベントを処理する際にパフォーマンスを最適化するのに便利です。

`debounce` とは異なり、throttle は指定された時間内に関数が少なくとも1回は実行されることを保証します。

```typescript
import { throttle } from 'es-toolkit/function';

// 基本的な使用法 (1秒ごとに最大1回実行)
const throttledLog = throttle(() => {
  console.log('関数が実行されました!');
}, 1000);

// 最初の呼び出し: 即座に実行
throttledLog(); // '関数が実行されました!' を出力

// 1秒以内の追加呼び出し: 無視されます
throttledLog();
throttledLog();

// 1秒後に最後の呼び出しが trailing として実行されます

// スクロールイベントの最適化
const handleScroll = throttle(() => {
  console.log('スクロール位置:', window.scrollY);
}, 100); // 100ms ごとに最大1回

window.addEventListener('scroll', handleScroll);

// API 呼び出しの最適化
const searchThrottled = throttle(async (query: string) => {
  const results = await fetch(`/api/search?q=${query}`);
  console.log('検索結果:', await results.json());
}, 300);

// 入力するたびに呼び出しても 300ms ごとにのみ実際の検索を実行
searchThrottled('hello');
searchThrottled('hello w');
searchThrottled('hello world');
```

leading と trailing オプションを調整できます。

```typescript
import { throttle } from 'es-toolkit/function';

// leading のみ有効 (開始時のみ実行)
const leadingOnly = throttle(() => console.log('Leading only'), 1000, { edges: ['leading'] });

// trailing のみ有効 (終了時のみ実行)
const trailingOnly = throttle(() => console.log('Trailing only'), 1000, { edges: ['trailing'] });

leadingOnly(); // 即座に実行
leadingOnly(); // 無視されます
leadingOnly(); // 無視されます

trailingOnly(); // 即座には実行されません
trailingOnly(); // 無視されます
trailingOnly(); // 1秒後に実行されます
```

手動で制御することもできます。

```typescript
import { throttle } from 'es-toolkit/function';

const throttledFunc = throttle(() => console.log('実行されました'), 1000);

throttledFunc(); // 即座に実行
throttledFunc(); // 待機中

// 待機中の実行を即座に処理
throttledFunc.flush();

// 待機中の実行をキャンセル
throttledFunc.cancel();
```

#### パラメータ

- `func` (`F`): 実行を制限する関数です。
- `throttleMs` (`number`): 実行を制限する時間間隔(ミリ秒)です。
- `options` (`ThrottleOptions`, オプション): 追加オプションです。
  - `signal` (`AbortSignal`, オプション): 関数実行をキャンセルできるシグナルです。
  - `edges` (`Array<'leading' | 'trailing'>`, オプション): 関数実行のタイミングを決定します。デフォルトは `['leading', 'trailing']` です。

#### 戻り値

(`ThrottledFunction<F>`): 実行が制限された新しい関数を返します。`cancel` と `flush` メソッドを含みます。

## Lodash との互換性

`es-toolkit/compat` から `throttle` をインポートすると lodash と完全に互換性があります。

- `throttle` 関数は `leading` と `trailing` オプションを受け取ります。

  - `leading`: スロットル化された関数を最初に呼び出したときに即座に元の関数を実行するかどうかです。デフォルトは `true` です。
  - `trailing`: 最後のスロットル化された関数の呼び出しから `throttleMs` ミリ秒が経過した後に元の関数を実行するかどうかです。デフォルトは `true` です。

- `throttleMs` オプションのデフォルト値は `0` です。関数呼び出しが次のティックまでのみ遅延されることを意味します。

::: info `throttle` の `leading` と `trailing` オプション

デフォルトで `throttle` の `leading` と `trailing` オプションは `true` です。そのため `{ leading: true }` や `{ trailing: true }` のようなオプションは関数の動作を変更しません。

:::

```typescript
// leading オプションの例
const leadingFn = throttle(
  () => {
    console.log('Leading function executed');
  },
  1000,
  { leading: true }
);

// 'Leading function executed' をすぐにログに記録します。
// 続けて呼び出しても、1秒ごとに 'Leading function executed' をログに記録します。
leadingFn();

// trailing オプションの例
const trailingFn = throttle(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// 'Trailing function executed' をすぐにログに記録します。
// 続けて呼び出しても、1秒ごとに 'Trailing function executed' をログに記録します。
trailingFn();

// leading: false, trailing: true オプションの例
const trailingOnlyFn = throttle(
  () => {
    console.log('Trailing-only function executed');
  },
  1000,
  { leading: false, trailing: true }
);

// 'Trailing-only function executed' は最初にはログに記録されません。
// 続けて呼び出しても、1秒ごとに 'Trailing-only function executed' をログに記録します。
trailingOnlyFn();
```
