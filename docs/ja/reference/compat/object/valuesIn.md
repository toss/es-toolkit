# valuesIn (Lodash 互換性)

::: warning `Object.values` を使用してください

この `valuesIn` 関数はプロトタイププロパティを処理する複雑なロジックにより遅く動作します。

代わりに、より高速で現代的な `Object.values` を使用してください。

:::

オブジェクトのすべてのプロパティ値を配列として返し、継承されたプロトタイププロパティも含めます。

```typescript
const values = valuesIn(obj);
```

## 参照

### `valuesIn(object)`

オブジェクトからすべてのプロパティ値を配列として取得したい場合は、`valuesIn` を使用してください。通常の `Object.values` とは異なり、プロトタイプチェーンから継承されたプロパティの値も一緒に含まれます。

```typescript
import { valuesIn } from 'es-toolkit/compat';

const obj = { a: 1, b: 2, c: 3 };
valuesIn(obj); // [1, 2, 3]

// 配列も処理できる
valuesIn([1, 2, 3]); // [1, 2, 3]
```

プロトタイプから継承されたプロパティも含まれます。

```typescript
import { valuesIn } from 'es-toolkit/compat';

function Parent() {
  this.a = 1;
}
Parent.prototype.inherited = 'fromParent';

function Child() {
  Parent.call(this);
  this.b = 2;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.childProp = 'childValue';

const obj = new Child();
valuesIn(obj); // [1, 2, 'fromParent', 'childValue'] (constructor は除外)
```

`null` または `undefined` は空配列として処理されます。

```typescript
import { valuesIn } from 'es-toolkit/compat';

valuesIn(null); // []
valuesIn(undefined); // []
```

#### パラメータ

- `object` (`any`): 値を取得するオブジェクト。

#### 戻り値

(`any[]`): オブジェクトのすべてのプロパティ値を含む配列を返します。継承されたプロトタイププロパティの値も含まれます。
