# toPlainObject (Lodash 互換性)

::: warning Object.assignやスプレッド演算子を使用してください

この`toPlainObject`関数は複雑なプロトタイプ処理とキー列挙により遅く動作します。

代わりにより高速で現代的なObject.assign({}, obj)や{...obj}を使用してください。

:::

値を普通のオブジェクトに変換します。

```typescript
const plainObj = toPlainObject(value);
```

## 参照

### `toPlainObject(value)`

値を普通のオブジェクトに変換します。継承された列挙可能な文字列キー属性を自身の属性として平坦化します。

```typescript
import { toPlainObject } from 'es-toolkit/compat';

// コンストラクタ関数とプロトタイプ
function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

const foo = new Foo();
toPlainObject(foo);
// Returns: { b: 2, c: 3 }

// 配列をオブジェクトに変換
toPlainObject([1, 2, 3]);
// Returns: { 0: 1, 1: 2, 2: 3 }
```

様々なオブジェクト型を処理します。

```typescript
import { toPlainObject } from 'es-toolkit/compat';

// 文字列をオブジェクトに変換
toPlainObject('abc');
// Returns: { 0: 'a', 1: 'b', 2: 'c' }

// 既に普通のオブジェクトの場合
const obj = { a: 1, b: 2 };
toPlainObject(obj);
// Returns: { a: 1, b: 2 }
```

#### パラメータ

- `value` (`any`): 変換する値です。

#### 戻り値

(`any`): 継承された列挙可能な属性が自身の属性として平坦化された普通のオブジェクトを返します。
