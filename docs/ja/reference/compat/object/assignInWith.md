# assignInWith (Lodash 互換性)

::: warning カスタムロジックの実装を推奨します

この `assignInWith` 関数は、継承されたプロパティの処理とカスタマイザー関数の呼び出しにより、複雑で動作が遅くなります。

代わりに、`Object.assign` とカスタムロジックを直接実装する方法を使用してください。

:::

カスタマイザー関数を使用して、ソースオブジェクトのすべてのプロパティ(継承プロパティを含む)をターゲットオブジェクトに割り当てます。

```typescript
const result = assignInWith(target, ...sources, customizer);
```

## 使用法

### `assignInWith(target, ...sources, customizer)`

継承されたプロパティを含めながらプロパティの割り当て方法をカスタマイズしたい場合は、`assignInWith`を使用してください。カスタマイザー関数が各プロパティの最終値を決定します。

```typescript
import { assignInWith } from 'es-toolkit/compat';

// 基本的な使用法 - undefinedの場合のみ割り当て
const target = { a: 1, b: undefined };
const source = { b: 2, c: 3 };
const result = assignInWith(target, source, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// 結果: { a: 1, b: 2, c: 3 }

// 配列の値をマージするカスタマイザー
const target2 = { numbers: [1, 2] };
const source2 = { numbers: [3, 4], name: 'test' };
assignInWith(target2, source2, (objValue, srcValue) => {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return objValue.concat(srcValue);
  }
  return srcValue;
});
// 結果: { numbers: [1, 2, 3, 4], name: 'test' }

// 継承されたプロパティも含めて処理
function Parent() {}
Parent.prototype.inherited = 'value';
const child = Object.create(Parent.prototype);
child.own = 'ownValue';

const target3 = { existing: 'data' };
assignInWith(target3, child, (objValue, srcValue, key) => {
  if (objValue === undefined) {
    return `processed_${srcValue}`;
  }
  return objValue;
});
// 結果: { existing: 'data', own: 'processed_ownValue', inherited: 'processed_value' }
```

カスタマイザー関数が `undefined` を返す場合、デフォルトの割り当て動作が使用されます。この関数は、`assignIn`とは異なり、各プロパティにカスタムロジックを適用できます。

#### パラメータ

- `target` (`any`): プロパティがコピーされるターゲットオブジェクトです。
- `...sources` (`any[]`): プロパティをコピーするソースオブジェクトです。固有のプロパティと継承されたプロパティの両方がコピーされます。
- `customizer` (`function`): 割り当てる値を決定する関数です。`(objValue, srcValue, key, object, source) => any` の形式で、`undefined` を返すとデフォルトの割り当て動作を使用します。

#### 戻り値

(`any`): 修正されたターゲットオブジェクトを返します。ターゲットオブジェクト自体が変更されて返されます。
