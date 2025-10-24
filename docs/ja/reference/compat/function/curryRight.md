# curryRight (Lodash 互換性)

::: warning `es-toolkit` の [`curryRight`](../../function/curryRight.md) または手動クロージャを使用してください

この `curryRight` 関数は、複雑なプレースホルダー処理、引数数の検証、引数合成ロジックにより動作が遅くなります。

プレースホルダーが不要な場合は、より高速な `es-toolkit` の [`curryRight`](../../function/curryRight.md) またはシンプルなクロージャを使用してください。

:::

関数を右からカリー化し、最後の引数から1つずつまたは複数ずつ受け取ることができる関数を作成します。

```typescript
const curriedFunction = curryRight(func, arity);
```

## 参照

### `curryRight(func, arity)`

関数を右からカリー化し、最後の引数から部分適用したい場合は `curryRight` を使用します。通常の `curry` とは異なり、最後の引数から先に処理します。

```typescript
import { curryRight } from 'es-toolkit/compat';

// 基本的な使用法
function subtract(a, b, c) {
  return a - b - c;
}

const curriedSubtract = curryRight(subtract);

// 右から(最後の引数から)カリー化
console.log(curriedSubtract(1)(2)(5)); // 5 - 2 - 1 = 2
console.log(curriedSubtract(1, 2)(5)); // 5 - 2 - 1 = 2
console.log(curriedSubtract(1)(2, 5)); // 2 - 5 - 1 = -4
console.log(curriedSubtract(1, 2, 5)); // 1 - 2 - 5 = -6
```

`curry` と `curryRight` の違い:

```typescript
import { curry, curryRight } from 'es-toolkit/compat';

function divide(a, b, c) {
  return a / b / c;
}

// 通常の curry(左から)
const leftCurried = curry(divide);
console.log(leftCurried(12)(3)(2)); // ((12 / 3) / 2) = 2

// curryRight(右から)
const rightCurried = curryRight(divide);
console.log(rightCurried(2)(3)(12)); // ((12 / 3) / 2) = 2
// 最後に渡した 12 が最初の引数(a)になる
```

メインライブラリとの比較:

```typescript
// compat バージョン(柔軟だが遅い)
import { curryRight } from 'es-toolkit/compat';
const curriedCompat = curryRight(subtract);
curriedCompat(1, 2)(3); // サポート
curriedCompat(1)(curryRight.placeholder, 3)(2); // プレースホルダーサポート

// メインライブラリバージョン(より高速だが一度に1つのみ)
import { curryRight } from 'es-toolkit';
const curriedMain = curryRight(subtract);
curriedMain(1)(2)(3); // サポート
curriedMain(1, 2)(3); // サポートされていない
```

プレースホルダー機能の使用:

```typescript
import { curryRight } from 'es-toolkit/compat';

function formatMessage(name, action, time) {
  return `${name}さんが${action}を${time}に行いました`;
}

const curriedFormat = curryRight(formatMessage);

// プレースホルダーで特定の位置をスキップ
const todayAction = curriedFormat('今日');
const todayLoginAction = todayAction(curryRight.placeholder, 'ログイン');

console.log(todayLoginAction('田中'));
// "田中さんがログインを今日に行いました"

// 時間を先に固定
const morningFormat = curriedFormat('朝9時');
console.log(morningFormat('コメント作成', '佐藤'));
// "佐藤さんがコメント作成を朝9時に行いました"
```

配列処理での活用:

```typescript
import { curryRight } from 'es-toolkit/compat';

// 配列の末尾から特定の数だけ取得
function takeFromEnd(array, count, separator = ', ') {
  return array.slice(-count).join(separator);
}

const curriedTake = curryRight(takeFromEnd);

// カンマ区切りの関数を作成
const takeWithComma = curriedTake(', ');

// 最後の3つを取得
const takeLast3 = takeWithComma(3);

const fruits = ['りんご', 'バナナ', 'オレンジ', 'ぶどう', 'キウイ'];
console.log(takeLast3(fruits)); // "オレンジ, ぶどう, キウイ"

// 異なる区切り文字を使用
const takeWithDash = curriedTake(' - ');
console.log(takeWithDash(2, fruits)); // "ぶどう - キウイ"
```

関数合成での活用:

```typescript
import { curryRight } from 'es-toolkit/compat';

// ログ出力関数
function logWithPrefix(message, level, timestamp) {
  return `[${timestamp}] ${level}: ${message}`;
}

const curriedLog = curryRight(logWithPrefix);

// 現在時刻で固定
const currentTimeLog = curriedLog(new Date().toISOString());

// レベル別のロガーを作成
const errorLog = currentTimeLog('ERROR');
const infoLog = currentTimeLog('INFO');
const debugLog = currentTimeLog('DEBUG');

// 使用
console.log(errorLog('データベース接続失敗'));
console.log(infoLog('サーバー起動'));
console.log(debugLog('ユーザーリクエスト処理中'));
```

関数型プログラミングパイプライン:

```typescript
import { curryRight } from 'es-toolkit/compat';

// データ変換関数
const mapWith = curryRight((array, fn) => array.map(fn));
const filterWith = curryRight((array, predicate) => array.filter(predicate));
const reduceWith = curryRight((array, reducer, initial) => array.reduce(reducer, initial));

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 変換関数を定義
const double = x => x * 2;
const isEven = x => x % 2 === 0;
const sum = (acc, val) => acc + val;

// パイプラインを構成(右から優先)
const processNumbers = nums => {
  return reduceWith(filterWith(mapWith(nums, double), isEven), sum, 0);
};

console.log(processNumbers(numbers)); // すべての数を2倍にして偶数のみフィルタリングして合計
```

API リクエストビルダー:

```typescript
import { curryRight } from 'es-toolkit/compat';

function makeRequest(url, method, headers, body) {
  return fetch(url, { method, headers, body });
}

const curriedRequest = curryRight(makeRequest);

// body から設定
const withJsonBody = curriedRequest(JSON.stringify({ data: 'test' }));

// headers を追加
const withHeaders = withJsonBody({
  'Content-Type': 'application/json',
  Authorization: 'Bearer token123',
});

// POST メソッドを設定
const postRequest = withHeaders('POST');

// 最終的な使用
postRequest('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

手動カリー化の代替:

```typescript
// curryRight を使用
const curriedSubtract = curryRight((a, b, c) => a - b - c);

// 手動クロージャ(より高速、右から)
const manualCurryRight = c => b => a => a - b - c;

// 両方とも同じ結果
console.log(curriedSubtract(1)(2)(5)); // 2
console.log(manualCurryRight(1)(2)(5)); // 2
```

引数数の指定:

```typescript
import { curryRight } from 'es-toolkit/compat';

function variableArgsFunction(a, b, c, ...rest) {
  return { a, b, c, rest };
}

// 引数数を3に制限(rest は無視)
const curriedFixed = curryRight(variableArgsFunction, 3);

// 右から c, b, a の順序で受け取る
console.log(curriedFixed(3)(2)(1)); // { a: 1, b: 2, c: 3, rest: [] }
```

#### パラメータ

- `func` (`Function`): 右からカリー化する関数です。
- `arity` (`number`, オプション): 関数の引数数です。省略すると `func.length` が使用されます。

#### 戻り値

(`Function & { placeholder: symbol }`): 右からカリー化された関数を返します。`placeholder` プロパティで引数の位置を制御できます。
