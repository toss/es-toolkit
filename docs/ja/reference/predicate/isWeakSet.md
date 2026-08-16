# isWeakSet

与えられた値が `WeakSet` インスタンスかどうかを確認します。

```typescript
const result = isWeakSet(value);
```

## 使用法

### `isWeakSet(value)`

値が WeakSet インスタンスかどうかを確認したい場合は `isWeakSet` を使用してください。

```typescript
import { isWeakSet } from 'es-toolkit/predicate';

// WeakSet インスタンス
const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet([{}, []]);

console.log(isWeakSet(weakSet1)); // true
console.log(isWeakSet(weakSet2)); // true

// WeakSet でない値
console.log(isWeakSet(new Set())); // false
console.log(isWeakSet(new Map())); // false
console.log(isWeakSet(new WeakMap())); // false
console.log(isWeakSet([])); // false
console.log(isWeakSet({})); // false
console.log(isWeakSet(null)); // false
console.log(isWeakSet(undefined)); // false
```

#### パラメータ

- `value` (`unknown`): WeakSet インスタンスかどうかを確認する値です。

#### 戻り値

(`value is WeakSet<WeakKey>`): 値が WeakSet インスタンスの場合は `true`、それ以外の場合は `false` を返します。
