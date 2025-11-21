# constant (Lodash 互換性)

::: warning アロー関数を使用してください

この`constant`関数は単純な作業のために追加の関数ラッパーを作成し、不要なオーバーヘッドが発生します。

代わりにより簡単で直感的なアロー関数を使用してください。

:::

与えられた値を常に返す関数を作成します。

```typescript
const constantFunction = constant(value);
```

## 使用法

### `constant(value)`

特定の値を常に返す関数が必要な時に`constant`を使用してください。関数型プログラミングでデフォルト値を提供したりコールバック関数として使用する際に役立ちます。

```typescript
import { constant } from 'es-toolkit/compat';

// 基本的な使用法
const always42 = constant(42);
console.log(always42()); // 42

const alwaysHello = constant('hello');
console.log(alwaysHello()); // "hello"
```

配列のmapや他の高階関数と一緒に使用する際に便利です。

```typescript
import { constant } from 'es-toolkit/compat';

// すべての要素を0で埋める
const numbers = [1, 2, 3, 4, 5];
const zeros = numbers.map(constant(0));
console.log(zeros); // [0, 0, 0, 0, 0]

// すべての要素を同じオブジェクトに変更
const users = ['alice', 'bob', 'charlie'];
const defaultUser = users.map(constant({ role: 'user', active: true }));
console.log(defaultUser);
// [{ role: 'user', active: true }, { role: 'user', active: true }, { role: 'user', active: true }]
```

条件付きデフォルト値の提供にも活用できます。

```typescript
import { constant } from 'es-toolkit/compat';

function processData(data, fallback = constant('デフォルト値')) {
  return data || fallback();
}

console.log(processData(null)); // "デフォルト値"
console.log(processData('実際のデータ')); // "実際のデータ"
```

オブジェクト参照を維持します。

```typescript
import { constant } from 'es-toolkit/compat';

const obj = { a: 1 };
const getObj = constant(obj);

console.log(getObj() === obj); // true (同じオブジェクト参照)
```

#### パラメータ

- `value` (`T`, オプション): 関数が返す値です。提供しなければ`undefined`を返します。

#### 戻り値

(`() => T | undefined`): 与えられた値を常に返す新しい関数を返します。
