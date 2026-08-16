# assignWith (Lodash 互換性)

::: warning カスタムロジックの実装を推奨します

この `assignWith` 関数は、複雑なカスタマイザー関数の処理により相対的に遅くなります。

代わりに、`Object.assign` とカスタムロジックを直接実装する方法を使用してください。

:::

カスタマイザー関数を使用して、ソースオブジェクトのプロパティをターゲットオブジェクトに割り当てます。

```typescript
const result = assignWith(target, source1, source2, customizer);
```

## 使用法

### `assignWith(object, ...sources, customizer)`

プロパティの割り当て方法をカスタマイズしたい場合は、`assignWith`を使用してください。カスタマイザー関数が各プロパティの最終値を決定します。

```typescript
import { assignWith } from 'es-toolkit/compat';

// 基本的な使用法 - undefinedの場合のみ割り当て
const target = { a: 1, b: undefined };
const source = { b: 2, c: 3 };
const result = assignWith(target, source, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Returns: { a: 1, b: 2, c: 3 }

// 配列のマージ
const target2 = { users: ['alice'] };
const source2 = { users: ['bob', 'charlie'] };
const result2 = assignWith(target2, source2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// Returns: { users: ['alice', 'bob', 'charlie'] }

// 複数のソースとカスタマイザー
const target3 = { a: 1 };
const result3 = assignWith(target3, { b: 2 }, { c: 3 }, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Returns: { a: 1, b: 2, c: 3 }
```

#### パラメータ

- `object` (`any`): プロパティが割り当てられるターゲットオブジェクトです。
- `...sources` (`any[]`): プロパティをコピーするソースオブジェクトです。
- `customizer` (`function`): 割り当てる値を決定する関数です。`(objValue, srcValue, key, object, source) => any` の形式です。

#### 戻り値

(`any`): カスタマイザー関数によって決定された値が割り当てられたターゲットオブジェクトを返します。
