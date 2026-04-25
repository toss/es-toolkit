# before (Lodash 互換性)

::: warning `es-toolkit` の [`before`](../../function/before.md) を使用してください

この `before` 関数は、複雑な型検証と整数変換処理により動作が遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [before](../../function/before.md) を使用してください。

:::

指定された回数まで元の関数を実行し、その後は最後の結果を返す関数を作成します。

```typescript
const limitedFunction = before(n, func);
```

## 使用法

### `before(n, func)`

関数を特定の回数まで実行するように制限したい場合は `before` を使用してください。関数呼び出し回数を制限したり、初期設定段階でのみ関数を実行したい場合に便利です。

```typescript
import { before } from 'es-toolkit/compat';

// 基本的な使い方
let count = 0;
const beforeThree = before(3, () => ++count);

console.log(beforeThree()); // 1 (最初の呼び出し)
console.log(beforeThree()); // 2 (2回目の呼び出し)
console.log(beforeThree()); // 2 (3回目以降は最後の結果を返す)
console.log(beforeThree()); // 2 (引き続き最後の結果を返す)
```

クロージャを使用した代替案：

```typescript
// before を使用
const beforeThree = before(3, myFunction);

// クロージャを使用（よりシンプルで高速）
function createBefore(limit, callback) {
  let callCount = 0;
  let lastResult;

  return function (...args) {
    if (callCount < limit - 1) {
      lastResult = callback.apply(this, args);
      callCount++;
    }
    return lastResult;
  };
}

const beforeThreeAlternative = createBefore(3, myFunction);
```

初期化関数として活用：

```typescript
import { before } from 'es-toolkit/compat';

class Database {
  constructor() {
    this.isInitialized = false;

    // 初期化は一度だけ実行
    this.initialize = before(2, () => {
      console.log('データベースを初期化中...');
      this.setupConnection();
      this.isInitialized = true;
      return '初期化完了';
    });
  }

  setupConnection() {
    // 実際の接続設定ロジック
  }

  query(sql) {
    const initResult = this.initialize();
    console.log(initResult); // 最初の呼び出し: "初期化完了"、以降：同じ結果

    // クエリ実行ロジック
    return `クエリを実行: ${sql}`;
  }
}

const db = new Database();
db.query('SELECT * FROM users'); // 初期化実行
db.query('SELECT * FROM products'); // 初期化は実行されない
```

API 呼び出しの制限：

```typescript
import { before } from 'es-toolkit/compat';

// API 呼び出しを最大5回まで許可
const limitedApiCall = before(6, endpoint => {
  console.log(`API 呼び出し: ${endpoint}`);
  return fetch(endpoint).then(res => res.json());
});

// 最初の5回は実際の API 呼び出し
limitedApiCall('/api/data1'); // 実際の呼び出し
limitedApiCall('/api/data2'); // 実際の呼び出し
limitedApiCall('/api/data3'); // 実際の呼び出し
limitedApiCall('/api/data4'); // 実際の呼び出し
limitedApiCall('/api/data5'); // 実際の呼び出し
limitedApiCall('/api/data6'); // 最後の結果を返す（API 呼び出しなし）
```

イベントリスナーの制限：

```typescript
import { before } from 'es-toolkit/compat';

// クリックイベントを3回まで処理
const limitedClickHandler = before(4, event => {
  console.log('クリック処理:', event.target.id);
  return `処理完了: ${Date.now()}`;
});

document.getElementById('button').addEventListener('click', limitedClickHandler);
// 最初の3回のクリックのみ処理され、その後は最後の結果を返す
```

パラメータと戻り値の処理：

```typescript
import { before } from 'es-toolkit/compat';

const limitedCalculator = before(3, (operation, a, b) => {
  const result = operation === 'add' ? a + b : a - b;
  console.log(`計算: ${a} ${operation} ${b} = ${result}`);
  return result;
});

console.log(limitedCalculator('add', 5, 3)); // "計算: 5 add 3 = 8"、返す: 8
console.log(limitedCalculator('subtract', 10, 4)); // "計算: 10 subtract 4 = 6"、返す: 6
console.log(limitedCalculator('multiply', 7, 2)); // 計算しない、返す: 6（最後の結果）
```

0または1を渡すと関数が実行されません：

```typescript
import { before } from 'es-toolkit/compat';

const neverCalled = before(0, () => {
  console.log('この関数は実行されません');
  return '結果';
});

const onceOnly = before(1, () => {
  console.log('この関数も実行されません');
  return '結果';
});

console.log(neverCalled()); // undefined
console.log(onceOnly()); // undefined
```

リソースクリーンアップの最適化：

```typescript
import { before } from 'es-toolkit/compat';

// 関数参照が自動的にクリーンアップされてメモリリークを防止
const limitedProcessor = before(2, data => {
  // 複雑なデータ処理
  return processComplexData(data);
});

// 2回目の呼び出し後、元の関数参照が削除される（ガベージコレクション）
```

#### パラメータ

- `n` (`number`): 関数を実行する最大回数。n-1回まで実行され、n回目以降は最後の結果を返します。
- `func` (`Function`): 制限する関数。

#### 戻り値

(`Function`): 指定された回数まで元の関数を実行し、その後は最後の結果を返す新しい関数を返します。
