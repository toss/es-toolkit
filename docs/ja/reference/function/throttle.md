# throttle

提供された関数を `throttleMs` ミリ秒ごとに最大1回だけ呼び出すスロットル化された関数を生成します。時間内にスロットル化された関数を再度呼び出しても、元の関数は実行されません。

## インターフェース

```typescript
function throttle<F extends (...args: any[]) => void>(func: F, throttleMs: number): (...args: Parameters<F>) => void;
```

### パラメータ

- `func` (`F`): スロットル化する関数。
- `throttleMs`(`number`): 実行をスロットル化するミリ秒。

### 戻り値

(`(...args: Parameters<F>) => void`): 新しいスロットル化された関数。

## 例

```typescript
const throttledFunction = throttle(() => {
  console.log('呼び出し');
}, 1000);

// すぐに '呼び出し' をログに記録します
throttledFunction();

// スロットル時間内なので何もログに記録しません
throttledFunction();

// 1秒後
setTimeout(() => {
  throttledFunction(); // '呼び出し' をログに記録します
}, 1000);
```

## Lodashとの互換性

`es-toolkit/compat`から`throttle`をインポートすると、lodashと完全に互換性があります。

- `throttle`関数は`leading`と`trailing`オプションを受け取ります。

  - `leading`: スロットル化された関数を最初に呼び出したときに即座に元の関数を実行するかどうかです。デフォルトは`true`です。
  - `trailing`: 最後のスロットル化された関数の呼び出しから`throttleMs`ミリ秒が経過した後に元の関数を実行するかどうかです。デフォルトは`true`です。
  - `leading`と`trailing`の両方が`true`の場合、元の関数は遅延の開始時と終了時の両方で呼び出されます。ただし、両方の時点で呼び出されるためには、スロットル化された関数が`throttleMs`ミリ秒の間に少なくとも2回呼び出される必要があります。スロットル化された関数の1回の呼び出しで元の関数が2回呼び出されることはありません。

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
