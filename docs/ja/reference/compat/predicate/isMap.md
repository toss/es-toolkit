# isMap (Lodash互換性)

::: warning es-toolkitの[isMap](../../predicate/isMap.md)を使用してください

この`isMap`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より速く現代的な`es-toolkit`の[isMap](../../predicate/isMap.md)を使用してください。

:::

値がMapかどうかを確認します。

```typescript
const result = isMap(value);
```

## 使用法

### `isMap(value)`

値がMapかどうかを型安全に確認したい場合は`isMap`を使用してください。TypeScriptでタイプガードとしても動作します。

```typescript
import { isMap } from 'es-toolkit/compat';

// Mapの確認
const map = new Map();
isMap(map); // true

// 他の型はfalse
isMap(new Set()); // false
isMap(new WeakMap()); // false
isMap({}); // false
isMap([]); // false
isMap('map'); // false
isMap(123); // false
isMap(null); // false
isMap(undefined); // false
```

Mapと似た他のコレクションとも区別します。

```typescript
import { isMap } from 'es-toolkit/compat';

// Map vs Set vs WeakMap
isMap(new Map([['key', 'value']])); // true
isMap(new Set(['value'])); // false
isMap(new WeakMap()); // false

// Map vs 通常のオブジェクト
isMap({}); // false
isMap({ key: 'value' }); // false
isMap(Object.create(null)); // false
```

#### パラメータ

- `value` (`unknown`): Mapかどうかを確認する値です。

#### 戻り値

(`value is Map<any, any>`): 値がMapの場合は`true`、そうでない場合は`false`を返します。
