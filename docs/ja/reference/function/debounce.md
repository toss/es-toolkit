# debounce

提供された関数の呼び出しを遅延させるデバウンスされた関数を生成します。
デバウンスされた関数は、最後に呼び出されてから `debounceMs` ミリ秒が経過した後に呼び出されます。
デバウンスされた関数は、保留中の実行をキャンセルする `cancel` メソッドも持っています。

## インターフェース

```typescript
function debounce<F extends (...args: any[]) => void>(
  func: F,
  debounceMs: number,
  options?: DebounceOptions
): ((...args: Parameters<F>) => void) & { cancel: () => void };
```

### パラメータ

- `func` (`F`): デバウンスされた関数を作成する関数。
- `debounceMs`(`number`): デバウンスで遅延させるミリ秒。
- `options` (`DebounceOptions`, オプション): オプションオブジェクト。
  - `signal` (`AbortSignal`, オプション): デバウンスされた関数をキャンセルするためのオプションの `AbortSignal`。
  - `edges` (`Array<'leading' | 'trailing'>`, オプション): 元の関数をいつ実行するかを示す配列。デフォルトは `['trailing']` です。
    - `'leading'` が含まれている場合、デバウンスされた関数が最初に呼び出されたときに即座に元の関数を実行します。
    - `'trailing'` が含まれている場合、最後のデバウンスされた関数の呼び出しから `debounceMs` ミリ秒が経過した後に元の関数を実行します。
    - `'leading'` と `'trailing'` の両方が含まれている場合、元の関数は遅延の開始時と終了時の両方で呼び出されます。ただし、両方の時点で呼び出されるためには、デバウンスされた関数が `debounceMs` ミリ秒の間に少なくとも2回呼び出される必要があります。デバウンスされた関数を1回呼び出して元の関数を2回呼び出すことはできません。

### 戻り値

(`((...args: Parameters<F>) => void) & { cancel: () => void; flush: () => void; schedule: () => void; }`): デバウンスされた関数。デバウンス動作を制御するための追加のメソッドを持っています。

- `cancel` (`() => void`): 保留中のデバウンス呼び出しをキャンセルします。
- `flush` (`() => void`): 保留中のデバウンス呼び出しを即座に実行します。
- `schedule` (`() => void`): デバウンス呼び出しが少なくとも `debounceMs` 後に実行されるようにスケジュールします。

## 例

### 基本的な使用法

```typescript
const debouncedFunction = debounce(() => {
  console.log('実行されました');
}, 1000);

// 1秒以内に再度呼び出されなければ、'実行されました'をログに記録します
debouncedFunction();

// 前回の呼び出しがキャンセルされたため、何もログに記録しません
debouncedFunction.cancel();
```

### AbortSignalの使用法

```typescript
const controller = new AbortController();
const signal = controller.signal;
const debouncedWithSignalFunction = debounce(
  () => {
    console.log('関数が実行されました');
  },
  1000,
  { signal }
);

// 1秒以内に再度呼び出されなければ、'関数が実行されました'をログに記録します
debouncedWithSignalFunction();

// デバウンス関数の呼び出しをキャンセルします
controller.abort();
```

## Lodashとの互換性

`es-toolkit/compat`から`debounce`をインポートすると、lodashと完全に互換性があります。

- `debounce`関数は`leading`と`trailing`オプションを受け取ります。

  - `leading`: デバウンスされた関数を最初に呼び出したときに即座に元の関数を実行するかどうかです。デフォルトは`false`です。
  - `trailing`: 最後のデバウンスされた関数の呼び出しから`debounceMs`ミリ秒が経過した後に元の関数を実行するかどうかです。デフォルトは`true`です。

- `debounce`関数は`maxWait`オプションも受け取ります。

  - 元の関数の呼び出しが最大で遅延されるミリ秒です。デフォルトは`Infinity`です。

- `debounceMs`オプションのデフォルト値は`0`です。関数の呼び出しが次のティックまで遅延されることを意味します。

::: info `{ leading: true }`オプションの意味

`trailing`はデフォルトで`true`なので、デバウンスを`{ leading: true }`に設定すると、`leading`と`trailing`の両方が`true`になります。

:::

```typescript
// leadingオプションの例
const leadingFn = debounce(
  () => {
    console.log('Leading function executed');
  },
  1000,
  { leading: true }
);

// 'Leading function executed'をすぐにログに記録します。
leadingFn();

// trailingオプションの例
const trailingFn = debounce(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// デバウンスされた関数がその間に呼び出されなければ、'Trailing function executed'を1秒後にログに記録します。
trailingFn();

// maxWaitオプションの例
const maxWaitFn = debounce(
  () => {
    console.log('MaxWait function executed');
  },
  1000,
  { maxWait: 2000 }
);

// 'MaxWait function executed'を2秒以内に必ずログに記録します。
maxWaitFn();
setTimeout(maxWaitFn, 500);
setTimeout(maxWaitFn, 1000);
setTimeout(maxWaitFn, 1500);
setTimeout(maxWaitFn, 2000);
setTimeout(maxWaitFn, 2500);
setTimeout(maxWaitFn, 3000);
```
