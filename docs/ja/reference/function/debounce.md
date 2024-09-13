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

### 戻り値

(`((...args: Parameters<F>) => void) & { cancel: () => void }`): `cancel` メソッドを持つデバウンスされた関数。

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
