# isWeakMap

与えられた値が `WeakMap` インスタンスかどうかを確認します。

```typescript
const result = isWeakMap(value);
```

## 使用法

### `isWeakMap(value)`

値が `WeakMap` インスタンスかどうかを確認したい場合は `isWeakMap` を使用してください。`WeakMap` はオブジェクトをキーとする弱参照のキーバリューストアで、メモリリークを防ぐのに役立ちます。

```typescript
import { isWeakMap } from 'es-toolkit/predicate';

// WeakMap インスタンス
const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap([[{}, 'value']]);

console.log(isWeakMap(weakMap1)); // true
console.log(isWeakMap(weakMap2)); // true

// WeakMap でない値
console.log(isWeakMap(new Map())); // false
console.log(isWeakMap(new Set())); // false
console.log(isWeakMap(new WeakSet())); // false
console.log(isWeakMap({})); // false
console.log(isWeakMap([])); // false
console.log(isWeakMap(null)); // false
console.log(isWeakMap(undefined)); // false
```

#### パラメータ

- `value` (`unknown`): WeakMap インスタンスかどうかを確認する値です。

#### 戻り値

(`boolean`): 値が WeakMap インスタンスの場合は `true`、それ以外の場合は `false` を返します。
