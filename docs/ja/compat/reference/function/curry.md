# curry (Lodash 互換性)

::: warning `es-toolkit` の `curry` または手動クロージャを使用してください
この `curry` 関数は、複雑なプレースホルダー処理、引数個数検証、引数合成ロジックにより、動作が遅くなります。

プレースホルダーが必要ない場合は、より高速な `es-toolkit` の [`curry`](../../function/curry.md) またはシンプルなクロージャを使用してください。
:::

関数をカリー化して、引数を一つずつ受け取るか、複数個を一度に受け取ることができる関数を作成します。

```typescript
const curriedFunction = curry(func, arity);
```

## 使用法

### `curry(func, arity)`

部分適用を容易にするために関数をカリー化したい場合に `curry` を使用します。引数を段階的に提供する場合や、プレースホルダーを使用して特定の位置の引数を後で提供する場合に便利です。

```typescript
import { curry } from 'es-toolkit/compat';

// 基本的な使用法
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// さまざまな方法で呼び出し可能
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6
```

メインライブラリの curry との比較:

```typescript
// compat バージョン (柔軟、ただし遅い)
import { curry } from 'es-toolkit/compat';
const curriedCompat = curry(add);
curriedCompat(1, 2)(3); // サポート
curriedCompat(1)(curry.placeholder, 3)(2); // プレースホルダーサポート

// メインライブラリバージョン (より速い、ただし一度に一つずつのみ)
import { curry } from 'es-toolkit';
const curriedMain = curry(add);
curriedMain(1)(2)(3); // サポート
curriedMain(1, 2)(3); // サポートされていない
```

プレースホルダー機能の使用:

```typescript
import { curry } from 'es-toolkit/compat';

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const curriedGreet = curry(greet);

// プレースホルダーで中間引数をスキップ
const greetWithExclamation = curriedGreet(curry.placeholder, curry.placeholder, '!');
console.log(greetWithExclamation('Hello', 'John')); // "Hello, John!"

const sayHello = curriedGreet('Hello');
console.log(sayHello(curry.placeholder, '~')('Jane')); // "Hello, Jane~"
```

関数型プログラミングでの活用:

```typescript
import { curry } from 'es-toolkit/compat';

// マッピング関数を作成
const map = curry((fn, array) => array.map(fn));
const filter = curry((predicate, array) => array.filter(predicate));

const numbers = [1, 2, 3, 4, 5];

// 再利用可能な関数を生成
const double = x => x * 2;
const isEven = x => x % 2 === 0;

const mapDouble = map(double);
const filterEven = filter(isEven);

console.log(mapDouble(numbers)); // [2, 4, 6, 8, 10]
console.log(filterEven(numbers)); // [2, 4]

// 関数合成
const processNumbers = nums => mapDouble(filterEven(nums));
console.log(processNumbers(numbers)); // [4, 8]
```

API クライアントの構成:

```typescript
import { curry } from 'es-toolkit/compat';

function apiRequest(method, baseUrl, endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, {
    method,
    ...options,
  });
}

const curriedApiRequest = curry(apiRequest);

// デフォルト設定で特化した関数を生成
const apiGet = curriedApiRequest('GET', 'https://api.example.com');
const apiPost = curriedApiRequest('POST', 'https://api.example.com');

// 認証ヘッダーを含む
const authenticatedPost = apiPost(curry.placeholder, {
  headers: { Authorization: 'Bearer token123' },
});

// 使用
apiGet('/users'); // GET https://api.example.com/users
authenticatedPost('/users'); // POST with auth headers
```

数学演算関数:

```typescript
import { curry } from 'es-toolkit/compat';

const calculate = curry((operation, a, b) => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      throw new Error('サポートされていない演算');
  }
});

// 特化した演算関数
const add = calculate('+');
const subtract = calculate('-');
const multiply = calculate('*');

console.log(add(5, 3)); // 8
console.log(subtract(10)(4)); // 6
console.log(multiply(3, 4)); // 12

// プレースホルダーで第二オペランドを固定
const addFive = calculate('+', curry.placeholder, 5);
console.log(addFive(10)); // 15
```

引数個数の指定:

```typescript
import { curry } from 'es-toolkit/compat';

function variableArgsFunction(a, b, c, ...rest) {
  return [a, b, c, rest];
}

// 引数個数を 3 に制限
const curriedFixed = curry(variableArgsFunction, 3);

console.log(curriedFixed(1)(2)(3)); // [1, 2, 3, []]
console.log(curriedFixed(1, 2)(3)); // [1, 2, 3, []]

// 引数個数なしで使用 (デフォルト値: function.length)
const curriedDefault = curry(variableArgsFunction); // arity = 3
```

シンプルなカリー化の代替:

```typescript
// curry を使用
const curriedAdd = curry((a, b, c) => a + b + c);

// 手動クロージャ (より速い)
const manualCurry = a => b => c => a + b + c;

// どちらも同じ結果
console.log(curriedAdd(1)(2)(3)); // 6
console.log(manualCurry(1)(2)(3)); // 6
```

コンストラクタ関数もサポート:

```typescript
import { curry } from 'es-toolkit/compat';

function Person(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city;
}

const CurriedPerson = curry(Person);
const SeoulPerson = CurriedPerson(curry.placeholder, curry.placeholder, 'Seoul');

const person1 = new SeoulPerson('John', 30);
const person2 = new SeoulPerson('Jane', 25);

console.log(person1.city); // "Seoul"
console.log(person2.city); // "Seoul"
```

#### パラメータ

- `func` (`Function`): カリー化する関数。
- `arity` (`number`, オプション): 関数の引数個数。省略すると `func.length` が使用されます。

#### 戻り値

(`Function & { placeholder: symbol }`): カリー化された関数を返します。`placeholder` プロパティで引数の位置を制御できます。
