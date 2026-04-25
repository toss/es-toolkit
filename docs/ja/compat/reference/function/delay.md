# delay (Lodash 互換性)

::: warning `setTimeout`を使用してください

この `delay` 関数は `setTimeout` の単純なラッパーですが、追加の型検証と数値変換によりわずかなオーバーヘッドがあります。

代わりに、より高速で標準的な `setTimeout` を直接使用してください。

:::

指定された時間後に関数を実行するタイマーを設定します。

```typescript
const timerId = delay(func, wait, ...args);
```

## 使用法

### `delay(func, wait, ...args)`

関数の実行を特定の時間だけ遅延させたい場合は `delay` を使用してください。アニメーションのタイミング、ユーザーフィードバックの遅延、非同期操作のスケジューリングに便利です。

```typescript
import { delay } from 'es-toolkit/compat';

// 基本的な使い方
const timerId = delay(() => {
  console.log('1秒後に実行されました');
}, 1000);

// 引数と一緒に使用
delay(
  (name, age) => {
    console.log(`こんにちは、${age}歳の${name}さん！`);
  },
  2000,
  '山田太郎',
  30
);
// 2秒後：「こんにちは、30歳の山田太郎さん！」を出力
```

`setTimeout` との比較：

```typescript
// delay を使用
import { delay } from 'es-toolkit/compat';

const timerId1 = delay(myFunction, 1000, 'arg1', 'arg2');

// setTimeout を使用（より高速、標準）
const timerId2 = setTimeout(myFunction, 1000, 'arg1', 'arg2');

// またはアロー関数で
const timerId3 = setTimeout(() => myFunction('arg1', 'arg2'), 1000);
```

アニメーションシーケンス：

```typescript
import { delay } from 'es-toolkit/compat';

class AnimationSequence {
  constructor(element) {
    this.element = element;
  }

  fadeInSequence() {
    // 即座に開始
    this.element.style.opacity = '0';
    this.element.style.display = 'block';

    // 100ms後にフェードイン開始
    delay(() => {
      this.element.style.transition = 'opacity 500ms ease-in';
      this.element.style.opacity = '1';
    }, 100);

    // 1秒後にスケールアニメーション
    delay(() => {
      this.element.style.transform = 'scale(1.1)';
    }, 1000);

    // 1.5秒後に元のサイズに
    delay(() => {
      this.element.style.transform = 'scale(1)';
    }, 1500);
  }
}
```

タイマーのキャンセル：

```typescript
import { delay } from 'es-toolkit/compat';

class TimerManager {
  constructor() {
    this.timers = new Map();
  }

  setDelayedTask(id, task, delayMs) {
    // 既存のタイマーがあればキャンセル
    this.cancelTask(id);

    const timerId = delay(task, delayMs);
    this.timers.set(id, timerId);

    return timerId;
  }

  cancelTask(id) {
    const timerId = this.timers.get(id);
    if (timerId) {
      clearTimeout(timerId);
      this.timers.delete(id);
      return true;
    }
    return false;
  }

  cancelAllTasks() {
    this.timers.forEach(timerId => clearTimeout(timerId));
    this.timers.clear();
  }
}

const timerManager = new TimerManager();

// タスクをスケジュール
timerManager.setDelayedTask(
  'save',
  () => {
    console.log('自動保存されました');
  },
  5000
);

timerManager.setDelayedTask(
  'cleanup',
  () => {
    console.log('クリーンアップ完了');
  },
  10000
);

// 必要に応じて特定のタスクをキャンセル
// timerManager.cancelTask('save');

// ページのアンロード時にすべてのタイマーをクリーンアップ
window.addEventListener('beforeunload', () => {
  timerManager.cancelAllTasks();
});
```

#### パラメータ

- `func` (`Function`): 遅延後に実行する関数です。
- `wait` (`number`): 遅延するミリ秒数です。
- `args` (`...any[]`): 関数実行時に渡す引数です。

#### 戻り値

(`number`): タイマーIDを返します。`clearTimeout()`でキャンセルできます。
