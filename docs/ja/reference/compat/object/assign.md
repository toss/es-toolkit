# assign (Lodash 互換性)

::: warning `Object.assign`を使用してください

この `assign` 関数は、値が等しいかどうかをチェックする追加ロジックにより動作が遅くなります。

代わりに、より高速で現代的な `Object.assign` を使用してください。

:::

ソースオブジェクトのプロパティをターゲットオブジェクトに割り当てます。

```typescript
const result = assign(target, ...sources);
```

## 参照

### `assign(target, ...sources)`

1つ以上のソースオブジェクトのプロパティをターゲットオブジェクトにコピーしたい場合は、`assign`を使用してください。同じキーがある場合、後のソースの値が前の値を上書きします。

```typescript
import { assign } from 'es-toolkit/compat';

// 基本的な使用法
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = assign(target, source);
// 結果: { a: 1, b: 3, c: 4 }
console.log(target === result); // true (ターゲットオブジェクトが変更される)

// 複数のソースオブジェクトをマージ
const target2 = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
const source3 = { d: 4 };
assign(target2, source1, source2, source3);
// 結果: { a: 1, b: 2, c: 3, d: 4 }

// プロパティの上書き
const target3 = { x: 1, y: 2 };
const source4 = { y: 3, z: 4 };
const source5 = { y: 5 };
assign(target3, source4, source5);
// 結果: { x: 1, y: 5, z: 4 } (yは最後の値で上書きされます)
```

この関数は、オブジェクトの固有のプロパティのみをコピーし、継承されたプロパティはコピーしません。また、値が同じ場合は上書きしない最適化があります。

#### パラメータ

- `target` (`any`): プロパティがコピーされるターゲットオブジェクトです。
- `...sources` (`any[]`): プロパティをコピーするソースオブジェクトです。

#### 戻り値

(`any`): 修正されたターゲットオブジェクトを返します。ターゲットオブジェクト自体が変更されて返されます。
