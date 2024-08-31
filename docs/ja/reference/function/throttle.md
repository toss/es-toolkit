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
