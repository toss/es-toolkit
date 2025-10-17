# assignIn (Lodash 互換性)

::: warning `Object.assign`を使用してください

この `assignIn` 関数は、継承されたプロパティをコピーする追加処理と値比較ロジックにより動作が遅くなります。

代わりに、より高速で現代的な `Object.assign` を使用してください。

:::

ソースオブジェクトのすべてのプロパティ(継承されたプロパティを含む)をターゲットオブジェクトに割り当てます。

```typescript
const result = assignIn(target, ...sources);
```

## 参照

### `assignIn(target, ...sources)`

ソースオブジェクトの固有のプロパティと継承されたプロパティの両方をターゲットオブジェクトにコピーしたい場合は、`assignIn`を使用してください。`assign`とは異なり、プロトタイプチェーンのプロパティも含まれます。

```typescript
import { assignIn } from 'es-toolkit/compat';

// 基本的な使用法
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assignIn(target, source);
// 結果: { a: 1, b: 3, c: 4 }
console.log(target === result); // true (ターゲットオブジェクトが変更される)

// 複数のソースオブジェクトをマージ
const target2 = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
assignIn(target2, source1, source2);
// 結果: { a: 1, b: 2, c: 3 }

// 継承されたプロパティもコピー
function Parent() {}
Parent.prototype.inherited = 'inheritedValue';
const child = Object.create(Parent.prototype);
child.own = 'ownValue';

const target3 = {};
assignIn(target3, child);
// 結果: { own: 'ownValue', inherited: 'inheritedValue' }

// 配列のインデックスプロパティとlengthなどもコピー
const arr = [1, 2, 3];
arr.customProp = 'custom';
const target4 = {};
assignIn(target4, arr);
// 結果: { '0': 1, '1': 2, '2': 3, customProp: 'custom', length: 3 }
```

この関数は、`assign`とは異なり、継承されたプロパティも含めてコピーします。値が同じ場合は上書きしない最適化もあります。

#### パラメータ

- `target` (`any`): プロパティがコピーされるターゲットオブジェクトです。
- `...sources` (`any[]`): プロパティをコピーするソースオブジェクトです。固有のプロパティと継承されたプロパティの両方がコピーされます。

#### 戻り値

(`any`): 修正されたターゲットオブジェクトを返します。ターゲットオブジェクト自体が変更されて返されます。
