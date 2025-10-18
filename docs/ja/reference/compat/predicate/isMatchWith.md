# isMatchWith (Lodash 互換性)

カスタム比較関数を使用してオブジェクトが部分的に一致するかどうかを確認します。

```typescript
const result = isMatchWith(target, source, customizer);
```

## 参照

### `isMatchWith(target, source, customizer)`

カスタム比較ロジックが必要な場合に `isMatchWith` を使用してください。各プロパティの比較について直接制御することができます。

```typescript
import { isMatchWith } from 'es-toolkit/compat';

// 大文字小文字を区別しない文字列比較
const caseInsensitiveCompare = (objVal, srcVal) => {
  if (typeof objVal === 'string' && typeof srcVal === 'string') {
    return objVal.toLowerCase() === srcVal.toLowerCase();
  }
  return undefined; // デフォルト動作を使用
};

isMatchWith({ name: 'ALICE', age: 25 }, { name: 'alice' }, caseInsensitiveCompare); // true

// 数値範囲比較
const rangeCompare = (objVal, srcVal, key) => {
  if (key === 'age' && typeof srcVal === 'object' && srcVal.min !== undefined) {
    return objVal >= srcVal.min && objVal <= srcVal.max;
  }
  return undefined;
};

isMatchWith({ name: 'John', age: 25 }, { age: { min: 18, max: 30 } }, rangeCompare); // true

// 配列長比較
const lengthCompare = (objVal, srcVal, key) => {
  if (key === 'items' && Array.isArray(objVal) && typeof srcVal === 'number') {
    return objVal.length === srcVal;
  }
  return undefined;
};

isMatchWith({ items: ['a', 'b', 'c'], count: 3 }, { items: 3 }, lengthCompare); // true

// 複雑な条件付き比較
const conditionalCompare = (objVal, srcVal, key, object, source) => {
  // 特定のキーでのみ特別なロジックを適用
  if (key === 'status') {
    return objVal === 'active' || srcVal === 'any';
  }

  // ネストしたオブジェクトでの特別な処理
  if (typeof objVal === 'object' && objVal !== null && srcVal?.special) {
    return objVal.id === srcVal.special;
  }

  return undefined; // デフォルト動作
};

isMatchWith({ user: { id: 123, status: 'active' } }, { user: { special: 123 }, status: 'any' }, conditionalCompare); // true
```

#### パラメータ

- `target` (`unknown`): 一致するかどうかを確認するオブジェクトです。
- `source` (`unknown`): 一致パターンとなるオブジェクトです。
- `customizer` (`function`, オプション): 比較ロジックをカスタマイズする関数です。`true`、`false`、または `undefined` を返す必要があります。

#### 戻り値

(`boolean`): targetがsourceにカスタムロジックで部分的に一致する場合は `true`、そうでなければ `false` を返します。
