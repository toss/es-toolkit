# once

関数を一度だけ実行するように制限する新しい関数を作成します。

```typescript
const onceFunc = once(func);
```

## 使用法

### `once(func)`

関数が一度だけ実行されるように制限したいときに`once`を使用してください。以降の呼び出しでは最初の呼び出しの結果をそのまま返します。

初期化関数やイベントハンドラーなど一度だけ実行されるべきロジックに便利です。重複実行を防ぎ、一貫した結果を保証します。

```typescript
import { once } from 'es-toolkit/function';

// 初期化関数の例
const initialize = once(() => {
  console.log('アプリを初期化します');
  return { status: 'initialized' };
});

console.log(initialize()); // 'アプリを初期化します'がログ出力され、{ status: 'initialized' }を返す
console.log(initialize()); // ログなしで{ status: 'initialized' }を返す
console.log(initialize()); // ログなしで{ status: 'initialized' }を返す

// API呼び出しの例
const fetchConfig = once(async () => {
  console.log('設定を取得します');
  const response = await fetch('/api/config');
  return response.json();
});

// 最初の呼び出しでのみ実際のAPIリクエストが実行される
const config1 = await fetchConfig();
const config2 = await fetchConfig(); // キャッシュされた結果を返す
```

引数がある関数も使用できます。

```typescript
import { once } from 'es-toolkit/function';

const logOnce = once((message: string) => {
  console.log(`重要なメッセージ: ${message}`);
});

logOnce('こんにちは'); // '重要なメッセージ: こんにちは'を出力
logOnce('もう一度こんにちは'); // 出力されない(すでに呼び出し済み)
logOnce('またこんにちは'); // 出力されない(すでに呼び出し済み)
```

#### パラメータ

- `func` (`F`): 一度だけ呼び出されるように制限する関数です。

#### 戻り値

(`F`): 最初の呼び出し後に結果をキャッシュし、以降の呼び出しで同じ結果を返す新しい関数を返します。
