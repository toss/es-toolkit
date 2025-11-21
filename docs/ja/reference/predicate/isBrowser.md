# isBrowser

現在の実行環境がブラウザかどうかを確認します。

```typescript
const result = isBrowser();
```

## 使用法

### `isBrowser()`

ブラウザ環境でのみ実行されるべきコードがある場合に `isBrowser` を使用してください。`window.document` の存在を確認することでブラウザ環境かどうかを判断します。SSR（サーバーサイドレンダリング）や Node.js 環境で便利です。

```typescript
import { isBrowser } from 'es-toolkit/predicate';

// ブラウザ環境でのみ DOM 操作
if (isBrowser()) {
  document.getElementById('app').innerHTML = 'Hello World';
  console.log('ブラウザ環境で実行中');
} else {
  console.log('サーバー環境で実行中');
}
```

環境に応じた条件付きロジックの実装に活用できます。

```typescript
import { isBrowser } from 'es-toolkit/predicate';

function getWindowWidth() {
  if (isBrowser()) {
    return window.innerWidth;
  }
  return 0; // サーバーではデフォルト値を返す
}

// イベントリスナーの登録
function addWindowListener() {
  if (isBrowser()) {
    window.addEventListener('resize', () => {
      console.log('ウィンドウサイズが変更されました');
    });
  }
}
```

Next.js、Nuxt.js のような SSR フレームワークで特に便利です。

```typescript
import { isBrowser } from 'es-toolkit/predicate';

function initializeAnalytics() {
  if (isBrowser()) {
    // ブラウザでのみ分析スクリプトを読み込む
    const script = document.createElement('script');
    script.src = 'https://analytics.example.com/script.js';
    document.head.appendChild(script);
  }
}

// ローカルストレージへのアクセス
function getStoredValue(key: string) {
  if (isBrowser()) {
    return localStorage.getItem(key);
  }
  return null;
}
```

#### 戻り値

(`boolean`): 現在の環境がブラウザの場合は `true`、そうでなければ `false` を返します。
