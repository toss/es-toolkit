# bind (Lodash 互換性)

::: warning `Function.prototype.bind()` を使用してください

この `bind` 関数は、複雑なプレースホルダー処理、コンストラクタ関数のチェック、引数のマージロジックにより、動作が遅くなります。プレースホルダーが不要な場合は、ネイティブの `Function.prototype.bind()` の方が高速でシンプルです。

より高速で標準的な `Function.prototype.bind()` を使用してください。

:::

関数の `this` コンテキストを固定し、一部の引数を事前に提供する関数を作成します。

```typescript
const boundFunction = bind(func, thisObj, ...partialArgs);
```

## 使用法

### `bind(func, thisObj, ...partialArgs)`

関数の `this` コンテキストを固定したり、一部の引数を事前に提供したい場合は `bind` を使用してください。特に、プレースホルダーを使用して特定の位置の引数を後で提供したい場合に便利です。

```typescript
import { bind } from 'es-toolkit/compat';

// 基本的な使用法
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const object = { user: '田中' };
const boundGreet = bind(greet, object, 'こんにちは');

console.log(boundGreet('!')); // "こんにちは 田中!"
console.log(boundGreet('~')); // "こんにちは 田中~"
```

ネイティブ bind との比較:

```typescript
// bind を使用
import { bind } from 'es-toolkit/compat';

const boundFn1 = bind(func, thisObj, 'arg1');

// ネイティブ bind を使用（より高速）
const boundFn2 = func.bind(thisObj, 'arg1');

// 結果は同じだがネイティブの方が高速
```

プレースホルダー機能の使用:

```typescript
import { bind } from 'es-toolkit/compat';

function calculate(operation, a, b, suffix) {
  return `${a} ${operation} ${b} = ${operation === '+' ? a + b : a - b}${suffix}`;
}

// プレースホルダーで特定の位置の引数を後で提供
const calcWithSuffix = bind(
  calculate,
  null,
  bind.placeholder, // operation は後で提供
  bind.placeholder, // a は後で提供
  bind.placeholder, // b は後で提供
  '点' // suffix は事前に提供
);

console.log(calcWithSuffix('+', 5, 3)); // "5 + 3 = 8点"
console.log(calcWithSuffix('-', 10, 4)); // "10 - 4 = 6点"
```

より実用的なプレースホルダーの例:

```typescript
import { bind } from 'es-toolkit/compat';

function apiRequest(method, url, options, callback) {
  // API リクエストロジック
  console.log(`${method} ${url}`, options);
  callback(`${method} リクエスト完了`);
}

// POST リクエスト用の部分適用関数を作成
const postRequest = bind(
  apiRequest,
  null,
  'POST', // method を固定
  bind.placeholder, // url は後で提供
  { 'Content-Type': 'application/json' }, // options を固定
  bind.placeholder // callback は後で提供
);

postRequest('/api/users', result => {
  console.log(result); // "POST リクエスト完了"
});

postRequest('/api/products', result => {
  console.log(result); // "POST リクエスト完了"
});
```

メソッドのバインディング:

```typescript
import { bind } from 'es-toolkit/compat';

class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }

  log(level, message) {
    console.log(`[${this.prefix}] ${level}: ${message}`);
  }
}

const logger = new Logger('MyApp');

// 別のコンテキストで使用するためにメソッドをバインド
const logError = bind(logger.log, logger, 'ERROR');
const logInfo = bind(logger.log, logger, 'INFO');

// 独立して使用可能
setTimeout(() => logError('サーバー接続失敗'), 1000);
setTimeout(() => logInfo('アプリケーション起動'), 2000);
```

イベントハンドラーでの活用:

```typescript
import { bind } from 'es-toolkit/compat';

class ButtonHandler {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }

  handleClick(event, customData) {
    this.clickCount++;
    console.log(`${this.name} ボタンクリック #${this.clickCount}`);
    console.log('カスタムデータ:', customData);
    console.log('イベントタイプ:', event.type);
  }
}

const handler = new ButtonHandler('メニュー');

// カスタムデータは事前に提供し、イベントは後で渡す
const boundHandler = bind(
  handler.handleClick,
  handler,
  bind.placeholder, // event は後で
  'メニュー選択済み' // customData は事前に提供
);

// DOM イベントに接続（event が自動的に最初の引数として渡される）
document.getElementById('menu-btn')?.addEventListener('click', boundHandler);
```

コンストラクタ関数もサポート:

```typescript
import { bind } from 'es-toolkit/compat';

function Person(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city || 'ソウル';
}

// ソウル居住者を作成するコンストラクタ
const SeoulPerson = bind(Person, null, bind.placeholder, bind.placeholder, 'ソウル');

const person1 = new SeoulPerson('田中', 30);
const person2 = new SeoulPerson('鈴木', 25);

console.log(person1); // Person { name: '田中', age: 30, city: 'ソウル' }
console.log(person2); // Person { name: '鈴木', age: 25, city: 'ソウル' }
```

関数型プログラミングでの活用:

```typescript
import { bind } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];

// parseInt の基数を 10 に固定
const parseDecimal = bind(parseInt, null, bind.placeholder, 10);

// map で安全に使用
const parsed = ['1', '2', '3'].map(parseDecimal);
console.log(parsed); // [1, 2, 3]

// 通常の parseInt 使用時の問題
const problematic = ['1', '2', '3'].map(parseInt); // [1, NaN, NaN]
```

#### パラメータ

- `func` (`Function`): バインドする関数。
- `thisObj` (`any`, オプション): 関数にバインドする `this` 値。
- `partialArgs` (`...any[]`): 事前に提供する引数。`bind.placeholder` を使用して後で提供する位置を指定できます。

#### 戻り値

(`Function`): `this` が固定され、一部の引数が事前に適用された新しい関数を返します。
