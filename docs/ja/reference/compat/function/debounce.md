# debounce (Lodash 互換)

::: warning `es-toolkit` の [`debounce`](../../function/debounce.md) を使用してください

この `debounce` 関数は、複雑な `maxWait` 処理と Lodash 互換のオプション構造によるオーバーヘッドがあります。

代わりに、より高速で現代的な `es-toolkit` の [`debounce`](../../function/debounce.md) を使用してください。

:::

関数呼び出しを遅延させ、最後の呼び出しから指定された時間が経過した後にのみ実行されるデバウンス関数を作成します。

```typescript
const debouncedFunction = debounce(func, wait, options);
```

## 参照

### `debounce(func, wait, options)`

関数呼び出しを遅延させたい場合は `debounce` を使用してください。検索入力、スクロールイベント、ボタンクリックなどでの過度な呼び出しを防ぐのに便利です。

```typescript
import { debounce } from 'es-toolkit/compat';

// 基本的な使用法
const searchFunction = debounce(query => {
  console.log('検索:', query);
}, 300);

// 300ms 以内に再度呼び出されなければ実行される
searchFunction('React'); // 実行されない
searchFunction('Vue'); // 実行されない
searchFunction('Angular'); // 300ms 後に "検索: Angular" と出力
```

メインライブラリの debounce との比較:

```typescript
// compat バージョン(Lodash 互換、maxWait などの追加オプション)
import { debounce } from 'es-toolkit/compat';
const debouncedCompat = debounce(func, 300, {
  leading: true,
  trailing: false,
  maxWait: 1000
});

// メインライブラリバージョン(より高速でシンプル)
import { debounce } from 'es-toolkit';
const debouncedMain = debounce(func, 300, {
  edges: ['leading'] // leading/trailing の代わりに edges を使用
});
```

leading と trailing オプション:

```typescript
import { debounce } from 'es-toolkit/compat';

const func = () => console.log('実行されました');

// leading: true - 最初の呼び出し時に即座に実行
const leadingDebounce = debounce(func, 1000, { leading: true });
leadingDebounce(); // 即座に "実行されました" と出力
leadingDebounce(); // 1秒待機
// 1秒後に追加の実行なし

// trailing: true(デフォルト) - 最後の呼び出し後の遅延時間後に実行
const trailingDebounce = debounce(func, 1000, { trailing: true });
trailingDebounce(); // 1秒待機
trailingDebounce(); // 1秒待機(前のタイマーをキャンセル)
// 1秒後に "実行されました" と出力

// 両方とも true - 開始時と終了時に実行
const bothDebounce = debounce(func, 1000, {
  leading: true,
  trailing: true,
});
bothDebounce(); // 即座に "実行されました" と出力
bothDebounce(); // 1秒待機
// 1秒後に "実行されました" と出力(trailing)
```

maxWait オプション:

```typescript
import { debounce } from 'es-toolkit/compat';

// 最大2秒ごとには必ず実行
const debouncedWithMaxWait = debounce(() => console.log('保存されました'), 500, { maxWait: 2000 });

// 高速に連続呼び出しされても、最大2秒ごとに実行される
setInterval(() => {
  debouncedWithMaxWait();
}, 100); // 100ms ごとに呼び出されるが、2秒ごとに "保存されました" と出力
```

実際の検索例:

```typescript
import { debounce } from 'es-toolkit/compat';

class SearchComponent {
  constructor() {
    this.searchInput = document.getElementById('search');

    // ユーザー入力を 300ms デバウンス
    this.debouncedSearch = debounce(this.performSearch.bind(this), 300, {
      leading: false, // 入力開始時に即座に検索しない
      trailing: true, // 入力停止後に検索
    });

    this.searchInput.addEventListener('input', e => {
      this.debouncedSearch(e.target.value);
    });
  }

  performSearch(query) {
    if (query.length < 2) return;

    console.log('API 呼び出し:', query);
    // fetch(`/api/search?q=${query}`)...
  }
}
```

スクロールイベントの最適化:

```typescript
import { debounce } from 'es-toolkit/compat';

// スクロールイベントを 100ms デバウンスするが、最大 500ms ごとには実行
const optimizedScrollHandler = debounce(
  () => {
    const scrollTop = window.pageYOffset;
    console.log('スクロール位置:', scrollTop);

    // ヘッダーの非表示/表示ロジック
    if (scrollTop > 100) {
      document.header.classList.add('hidden');
    } else {
      document.header.classList.remove('hidden');
    }
  },
  100,
  { maxWait: 500 }
);

window.addEventListener('scroll', optimizedScrollHandler);
```

API 呼び出しの制限:

```typescript
import { debounce } from 'es-toolkit/compat';

class AutoSave {
  constructor() {
    // 500ms デバウンス、最大5秒ごとには保存
    this.debouncedSave = debounce(this.saveToServer.bind(this), 500, { maxWait: 5000 });
  }

  onTextChange(content) {
    this.pendingContent = content;
    this.debouncedSave();
  }

  saveToServer() {
    if (!this.pendingContent) return;

    console.log('サーバーに保存:', this.pendingContent);
    // fetch('/api/save', { ... })

    this.pendingContent = null;
  }
}
```

cancel と flush メソッド:

```typescript
import { debounce } from 'es-toolkit/compat';

const debouncedFunc = debounce(() => {
  console.log('実行されました');
}, 1000);

debouncedFunc(); // 1秒待機中

// 待機中の実行をキャンセル
debouncedFunc.cancel();

// または即座に実行
debouncedFunc(); // 1秒待機開始
debouncedFunc.flush(); // 即座に "実行されました" と出力し、タイマーをキャンセル
```

ボタンクリックの重複防止:

```typescript
import { debounce } from 'es-toolkit/compat';

const handleSubmit = debounce(
  async formData => {
    console.log('フォーム送信中...');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });
      console.log('送信完了');
    } catch (error) {
      console.error('送信失敗:', error);
    }
  },
  1000,
  { leading: true, trailing: false } // 最初のクリックのみ処理
);

document.getElementById('submit-btn').addEventListener('click', e => {
  const formData = new FormData(e.target.form);
  handleSubmit(formData);
});
```

リサイズイベント処理:

```typescript
import { debounce } from 'es-toolkit/compat';

const handleResize = debounce(
  () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log('ウィンドウサイズ変更:', { width, height });

    // レイアウトの再計算
    recalculateLayout();
  },
  250,
  { leading: false, trailing: true }
);

window.addEventListener('resize', handleResize);

// ページ終了時にクリーンアップ
window.addEventListener('beforeunload', () => {
  handleResize.cancel();
});
```

#### パラメータ

- `func` (`Function`): デバウンスする関数です。
- `wait` (`number`, オプション): 遅延するミリ秒数です。デフォルトは `0` です。
- `options` (`DebounceSettings`, オプション): オプションオブジェクトです。
  - `leading` (`boolean`): `true` の場合、遅延開始時点で関数を実行します。デフォルトは `false` です。
  - `trailing` (`boolean`): `true` の場合、遅延終了時点で関数を実行します。デフォルトは `true` です。
  - `maxWait` (`number`): 関数実行が遅延できる最大時間です。デフォルトは `Infinity` です。

#### 戻り値

(`DebouncedFunc`): デバウンスされた関数を返します。`cancel()` と `flush()` メソッドが含まれています。
