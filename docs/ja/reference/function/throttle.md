# throttle

提供された関数を `throttleMs` ミリ秒ごとに最大1回だけ呼び出すスロットル化された関数を生成します。時間内にスロットル化された関数を再度呼び出しても、元の関数は実行されません。

## インターフェース

```typescript
function throttle<F extends (...args: any[]) => void>(func: F, throttleMs: number): (...args: Parameters<F>) => void;
```

### パラメータ

- `func` (`F`): スロットル化する関数。
- `throttleMs`(`number`): 実行をスロットル化するミリ秒。
- `options` (`ThrottleOptions`, オプション): オプションオブジェクト。
  - `signal` (`AbortSignal`, オプション): スロットル化された関数をキャンセルするためのオプションの `AbortSignal`。
  - `edges` (`Array<'leading' | 'trailing'>`, オプション): 元の関数をいつ実行するかを示す配列。デフォルトは `['leading', 'trailing']` です。
    - `'leading'` が含まれている場合、スロットル化された関数が最初に呼び出されたときに即座に元の関数を実行します。
    - `'trailing'` が含まれている場合、最後のスロットル化された関数の呼び出しから `throttleMs` ミリ秒が経過した後に元の関数を実行します。
    - `'leading'` と `'trailing'` の両方が含まれている場合、元の関数は遅延の開始時と終了時の両方で呼び出されます。ただし、両方の時点で呼び出されるためには、スロットル化された関数が `throttleMs` ミリ秒の間に少なくとも2回呼び出される必要があります。スロットル化された関数を1回呼び出して元の関数を2回呼び出すことはできません。

### 戻り値

(`((...args: Parameters<F>) => void) & { cancel: () => void; flush: () => void; }`): スロットル化された関数。スロットル動作を制御するための追加のメソッドを持っています。

- `cancel` (`() => void`): 保留中のスロットル呼び出しをキャンセルします。
- `flush` (`() => void`): 保留中のスロットル呼び出しを即座に実行します。

## 例

### 基本的な使用法

```typescript
const throttledFunction = throttle(() => {
  console.log('Function executed');
}, 1000);
// 'Function executed'を即座にロギングします
throttledFunction(); // 最初の呼び出しは関数を即座に呼び出します

// 1秒後に 'Function executed'をロギングします
throttledFunction(); // 2回目の呼び出しは `throttleMs` 内で実行されましたが、'trailing' オプションのためスロットリング時間が終わると関数が呼び出されます

// 2秒後
setTimeout(() => {
  throttledFunction(); // 'Function executed'を再度ロギングします
}, 2000); // スロットリング時間が経過したため元の関数が呼び出されます
```

### Windowイベントの取り扱い

```typescript
// スロットル化する関数
const logResize = () => {
  console.log('ウィンドウがリサイズされました', new Date().toISOString());
};

// 関数をスロットル化します
const throttledResizeHandler = throttle(logResize, 1000);

// スロットル化された関数をリサイズイベントに登録します
window.addEventListener('resize', throttledResizeHandler);

// もはや必要ないイベントリスナーを解除します
const cleanup = () => {
  window.removeEventListener('resize', throttledResizeHandler);
};

// 10秒後にイベントリスナーを解除します
setTimeout(cleanup, 10000);
```

## Lodashとの互換性

`es-toolkit/compat`から`throttle`をインポートすると、lodashと完全に互換性があります。

- `throttle`関数は`leading`と`trailing`オプションを受け取ります。

  - `leading`: スロットル化された関数を最初に呼び出したときに即座に元の関数を実行するかどうかです。デフォルトは`true`です。
  - `trailing`: 最後のスロットル化された関数の呼び出しから`throttleMs`ミリ秒が経過した後に元の関数を実行するかどうかです。デフォルトは`true`です。

- デフォルトで、`throttleMs`オプションは`0`に設定されています。これは、関数の実行が次のティックまで遅延されることを意味します。

::: info `throttle`の`leading`と`trailing`オプション

デフォルトで、`throttle`の`leading`と`trailing`オプションは両方とも`true`に設定されています。したがって、`{ leading: true }`や`{ trailing: true }`を指定しても何も変わりません。

:::

```typescript
// leadingオプションの例
const leadingFn = throttle(
  () => {
    console.log('Leading function executed');
  },
  1000,
  { leading: true }
);

// 'Leading function executed'をすぐにログに記録します。
// 続けて呼び出しても、1秒ごとに'Leading function executed'をログに記録します。
leadingFn();

// trailingオプションの例
const trailingFn = throttle(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// 'Trailing function executed'をすぐにログに記録します。
// 続けて呼び出しても、1秒ごとに'Trailing function executed'をログに記録します。
trailingFn();
```
