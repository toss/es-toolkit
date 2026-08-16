# defaultTo (Lodash 互換性)

`null`、`undefined`、`NaN`の値に対してデフォルト値を返します。

```typescript
const result = defaultTo(value, defaultValue);
```

## 使用法

### `defaultTo(value, defaultValue)`

値が`null`、`undefined`、または`NaN`の時にデフォルト値を提供したい時に`defaultTo`を使用してください。APIレスポンスやユーザー入力で無効な値を処理する際に役立ちます。

```typescript
import { defaultTo } from 'es-toolkit/compat';

// 基本的な使用法
console.log(defaultTo(null, 'default')); // 'default'
console.log(defaultTo(undefined, 'default')); // 'default'
console.log(defaultTo(NaN, 0)); // 0
console.log(defaultTo('actual', 'default')); // 'actual'
console.log(defaultTo(123, 0)); // 123
```

APIレスポンス処理に活用できます。

```typescript
import { defaultTo } from 'es-toolkit/compat';

function processUserData(response) {
  return {
    name: defaultTo(response.name, '名前なし'),
    age: defaultTo(response.age, 0),
    score: defaultTo(response.score, 0), // NaN処理も含む
  };
}

// APIが不完全なデータを返す場合
const userData = processUserData({
  name: null,
  age: undefined,
  score: NaN,
});

console.log(userData);
// { name: '名前なし', age: 0, score: 0 }
```

配列やオブジェクトにも使用できます。

```typescript
import { defaultTo } from 'es-toolkit/compat';

const users = defaultTo(response.users, []);
const metadata = defaultTo(response.metadata, {});

// 空の配列やオブジェクトではなくnull/undefined/NaNのみを処理します
console.log(defaultTo([], ['default'])); // [] (空の配列ですが有効な値)
console.log(defaultTo({}, { default: true })); // {} (空のオブジェクトですが有効な値)
```

#### パラメータ

- `value` (`T | null | undefined`): 確認する値です。
- `defaultValue` (`D`): 値が`null`、`undefined`または`NaN`の場合に返すデフォルト値です。

#### 戻り値

(`T | D`): 値が有効であれば元の値を、そうでなければデフォルト値を返します。
