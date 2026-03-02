# isWeakMap (Lodash 互換性)

::: warning `instanceof` 演算子を使用してください

この `isWeakMap` 関数はLodash互換性のための関数ですが、単純な型確認です。

代わりにより簡単で現代的な `value instanceof WeakMap` を使用してください。

:::

値がWeakMapかどうかを確認します。

```typescript
const result = isWeakMap(value);
```

## 使用法

### `isWeakMap(value)`

値がWeakMapかどうかを型安全に確認したい場合に `isWeakMap` を使用してください。TypeScript で型ガードとしても動作します。

```typescript
import { isWeakMap } from 'es-toolkit/compat';

// WeakMap確認
const weakMap = new WeakMap();
isWeakMap(weakMap); // true

// その他の型はfalse
isWeakMap(new Map()); // false
isWeakMap(new Set()); // false
isWeakMap(new WeakSet()); // false
isWeakMap({}); // false
isWeakMap([]); // false
isWeakMap('weakmap'); // false
isWeakMap(123); // false
isWeakMap(null); // false
isWeakMap(undefined); // false
```

WeakMapと似た他のコレクションとも区別します。

```typescript
import { isWeakMap } from 'es-toolkit/compat';

// WeakMap vs Map
const obj = {};
const weakMap = new WeakMap([[obj, 'value']]);
const map = new Map([[obj, 'value']]);

isWeakMap(weakMap); // true
isWeakMap(map); // false

// WeakMap vs WeakSet
isWeakMap(new WeakMap()); // true
isWeakMap(new WeakSet()); // false

// WeakMap vs 一般オブジェクト
isWeakMap(new WeakMap()); // true
isWeakMap({}); // false
```

WeakMapの特別な属性を活用する際に便利です。

```typescript
import { isWeakMap } from 'es-toolkit/compat';

function setupWeakReference(collection: unknown, key: object, value: any) {
  if (isWeakMap(collection)) {
    // WeakMapはオブジェクトのみをキーとして使用でき、弱い参照を保持します
    collection.set(key, value);
    console.log('WeakMapに弱い参照として保存しました');

    // WeakMapはサイズを知ることができません
    console.log('WeakMapはサイズ情報がありません');
  } else {
    console.log('WeakMapではありません');
  }
}

const weakMap = new WeakMap();
const regularMap = new Map();
const obj = { id: 1 };

setupWeakReference(weakMap, obj, 'data'); // "WeakMapに弱い参照として保存しました"
setupWeakReference(regularMap, obj, 'data'); // "WeakMapではありません"
```

#### パラメータ

- `value` (`unknown`): WeakMapかどうかを確認する値です。

#### 戻り値

(`value is WeakMap<object, any>`): 値がWeakMapの場合は `true`、そうでなければ `false` を返します。
