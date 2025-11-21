# partial (Lodash 互換性)

::: warning `es-toolkit` の `partial` を使用してください

この `partial` 関数は多くのオーバーロードとユニオン型処理により非効率的です。また、ほとんどの場合、より簡単なアロー関数で代替できます。

代わりに、より高速で現代的な `es-toolkit` の [`partial`](../../function/partial.md) を使用してください。

:::

関数の引数を事前に埋めて部分適用された関数を作成します。

```typescript
const partialFunc = partial(func, ...args);
```

## 使用法

### `partial(func, ...args)`

関数の引数を事前に埋めて部分適用された関数を作成したい場合は `partial` を使用してください。主に引数の順序が重要な関数で最初の引数を固定する際に便利です。

```typescript
import { partial } from 'es-toolkit/compat';

// 基本的な使用法
function greet(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// 最初の引数を事前設定
const sayHello = partial(greet, 'Hello');
sayHello('Alice', '!'); // 'Hello Alice!'

// 複数の引数を事前設定
const greetAlice = partial(greet, 'Hello', 'Alice');
greetAlice('!'); // 'Hello Alice!'

// placeholder を使用して引数の順序を調整
const greetWithExclamation = partial(greet, partial.placeholder, 'Alice', '!');
greetWithExclamation('Hi'); // 'Hi Alice!'
```

ほとんどの場合、アロー関数で代替できます:

```typescript
// partial の代わりにアロー関数を使用(推奨)
const sayHello = (name, punctuation) => greet('Hello', name, punctuation);
const greetAlice = punctuation => greet('Hello', 'Alice', punctuation);
```

#### パラメータ

- `func` (`Function`): 部分適用する関数です。
- `...args` (`any[]`): 事前に埋める引数です。`partial.placeholder` を使用して引数の順序を調整できます。

#### 戻り値

(`Function`): 引数が事前に埋められた新しい関数を返します。
