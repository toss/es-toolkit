# toPairsIn (Lodash 互換性)

::: warning `Object.entries` または `for...in` ループを使用してください

この `toPairsIn` 関数は継承されたプロパティの処理、`Map` と `Set` の処理などの複雑なロジックにより遅く動作します。

代わりに、より高速で現代的な `Object.entries()` を使用するか、継承されたプロパティが必要な場合は `for...in` ループを使用してください。

:::

オブジェクトをキー値ペアの配列に変換し、継承されたプロパティも含めます。

```typescript
const pairs = toPairsIn(object);
```

## 使用法

### `toPairsIn(object)`

オブジェクトのすべての列挙可能なプロパティ(継承されたプロパティを含む)を `[キー, 値]` 形式の配列に変換したい場合は、`toPairsIn` を使用してください。`toPairs` とは異なり、プロトタイプチェーンのプロパティも一緒に含まれます。

```typescript
import { toPairsIn } from 'es-toolkit/compat';

// 基本的なオブジェクトの変換
const object = { a: 1, b: 2 };
toPairsIn(object);
// => [['a', 1], ['b', 2]]

// 継承されたプロパティも含む
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.proto = 'property';

const child = new Parent();
child.own = 'own';
toPairsIn(child);
// => [['inherited', 'value'], ['own', 'own'], ['proto', 'property']]
```

`Map` と `Set` も処理できます。

```typescript
import { toPairsIn } from 'es-toolkit/compat';

// Map オブジェクトの変換
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
toPairsIn(map);
// => [['key1', 'value1'], ['key2', 'value2']]

// Set オブジェクトの変換
const set = new Set([1, 2, 3]);
toPairsIn(set);
// => [[1, 1], [2, 2], [3, 3]]
```

#### パラメータ

- `object` (`object`): 変換するオブジェクト、Map、または Set。

#### 戻り値

(`Array<[string, any]>`): キー値ペアの配列を返します(継承されたプロパティを含む)。
