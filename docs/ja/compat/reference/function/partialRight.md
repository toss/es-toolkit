# partialRight (Lodash 互換性)

::: warning `es-toolkit` の `partialRight` を使用してください

この `partialRight` 関数は多くのオーバーロードとユニオン型処理により非効率的です。また、ほとんどの場合、より簡単なアロー関数で代替できます。

代わりに、より高速で現代的な `es-toolkit` の [`partialRight`](../../function/partialRight.md) を使用してください。

:::

関数の右側から引数を事前に埋めて部分適用された関数を作成します。

```typescript
const partialFunc = partialRight(func, ...args);
```

## 使用法

### `partialRight(func, ...args)`

関数の右側から引数を事前に埋めて部分適用された関数を作成したい場合は `partialRight` を使用してください。主に引数の順序が重要な関数で最後の引数を固定する際に便利です。

```typescript
import { partialRight } from 'es-toolkit/compat';

// 基本的な使用法
function greet(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// 最後の引数を事前設定
const greetWithExclamation = partialRight(greet, '!');
greetWithExclamation('Hello', 'Alice'); // 'Hello Alice!'

// 複数の引数を事前設定
const sayHiToAlice = partialRight(greet, 'Alice', '!');
sayHiToAlice('Hi'); // 'Hi Alice!'

// placeholder を使用して引数の順序を調整
const greetAliceWithCustom = partialRight(greet, 'Alice', partialRight.placeholder);
greetAliceWithCustom('Hello', '?'); // 'Hello Alice?'
```

ほとんどの場合、アロー関数で代替できます:

```typescript
// partialRight の代わりにアロー関数を使用(推奨)
const greetWithExclamation = (greeting, name) => greet(greeting, name, '!');
const sayHiToAlice = greeting => greet(greeting, 'Alice', '!');
```

#### パラメータ

- `func` (`Function`): 部分適用する関数です。
- `...args` (`any[]`): 事前に埋める引数です。`partialRight.placeholder` を使用して引数の順序を調整できます。

#### 戻り値

(`Function`): 右側から引数が事前に埋められた新しい関数を返します。
