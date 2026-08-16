# isWeakSet (Lodash 互換性)

::: warning `instanceof` 演算子を使用してください

この `isWeakSet` 関数はLodash互換性のための関数ですが、単純な型確認です。

代わりにより簡単で現代的な `value instanceof WeakSet` を使用してください。

:::

値がWeakSetかどうかを確認します。

```typescript
const result = isWeakSet(value);
```

## 使用法

### `isWeakSet(value)`

値がWeakSetかどうかを型安全に確認したい場合に `isWeakSet` を使用してください。TypeScript で型ガードとしても動作します。

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// WeakSet確認
const weakSet = new WeakSet();
isWeakSet(weakSet); // true

// その他の型はfalse
isWeakSet(new Set()); // false
isWeakSet(new Map()); // false
isWeakSet(new WeakMap()); // false
isWeakSet([]); // false
isWeakSet({}); // false
isWeakSet('weakset'); // false
isWeakSet(123); // false
isWeakSet(null); // false
isWeakSet(undefined); // false
```

WeakSetと似た他のコレクションとも区別します。

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// WeakSet vs Set
const obj = {};
const weakSet = new WeakSet([obj]);
const set = new Set([obj]);

isWeakSet(weakSet); // true
isWeakSet(set); // false

// WeakSet vs WeakMap
isWeakSet(new WeakSet()); // true
isWeakSet(new WeakMap()); // false

// WeakSet vs 配列
isWeakSet(new WeakSet()); // true
isWeakSet([]); // false
```

WeakSetの特別な属性を活用する際に便利です。

```typescript
import { isWeakSet } from 'es-toolkit/compat';

function addWeakReference(collection: unknown, item: object) {
  if (isWeakSet(collection)) {
    // WeakSetはオブジェクトのみを保存でき、弱い参照を保持します
    collection.add(item);
    console.log('WeakSetに弱い参照として保存しました');

    // WeakSetはサイズを知ることができず、反復処理もできません
    console.log('WeakSetはサイズ情報がなく反復処理できません');
  } else {
    console.log('WeakSetではありません');
  }
}

const weakSet = new WeakSet();
const regularSet = new Set();
const obj = { id: 1 };

addWeakReference(weakSet, obj); // "WeakSetに弱い参照として保存しました"
addWeakReference(regularSet, obj); // "WeakSetではありません"
```

メモリリーク防止のためのオブジェクト追跡に便利です。

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// DOM要素追跡の例
function trackDOMElement(tracker: unknown, element: Element) {
  if (isWeakSet(tracker)) {
    // DOM要素が削除されるとWeakSetからも自動的に削除されます
    tracker.add(element);
    console.log('DOM要素の追跡を開始しました');

    // 後で追跡状況を確認
    if (tracker.has(element)) {
      console.log('この要素は追跡中です');
    }
  }
}
```

#### パラメータ

- `value` (`unknown`): WeakSetかどうかを確認する値です。

#### 戻り値

(`value is WeakSet<object>`): 値がWeakSetの場合は `true`、そうでなければ `false` を返します。
