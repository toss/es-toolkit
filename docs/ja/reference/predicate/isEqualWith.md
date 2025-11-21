# isEqualWith

カスタム比較関数を使用して二つの値が等しいかどうかを確認します。

```typescript
const result = isEqualWith(a, b, areValuesEqual);
```

## 使用法

### `isEqualWith(a, b, areValuesEqual)`

特別な比較ロジックが必要な場合に `isEqualWith` を使用してください。カスタム関数が `true` または `false` を返す場合はその結果を使用し、`undefined` を返す場合はデフォルトの比較方式を使用します。大文字小文字の無視、特定のプロパティの除外、近似値の比較などに便利です。

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 大文字小文字を区別しない文字列比較
const caseInsensitiveCompare = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

isEqualWith('Hello', 'hello', caseInsensitiveCompare); // true
isEqualWith({ name: 'Alice' }, { name: 'ALICE' }, caseInsensitiveCompare); // true
```

数値の近似値比較にも活用できます。

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 浮動小数点の誤差を許容する比較
const approximateCompare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.01; // 0.01 以下の差は等しいとして扱う
  }
};

isEqualWith(0.1 + 0.2, 0.3, approximateCompare); // true
isEqualWith({ price: 10.01 }, { price: 10.02 }, approximateCompare); // true
```

特定のプロパティを無視して比較したい場合にも便利です。

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 特定のプロパティを無視して比較
const ignoreTimestamp = (a, b, property) => {
  if (property === 'timestamp') {
    return true; // timestamp プロパティは常に等しいとして扱う
  }
};

const obj1 = { id: 1, name: 'Test', timestamp: 1000 };
const obj2 = { id: 1, name: 'Test', timestamp: 2000 };
isEqualWith(obj1, obj2, ignoreTimestamp); // true
```

複雑なカスタム比較ロジックも実装できます。

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

const areValuesEqual = (a, b, property) => {
  // ID は無視
  if (property === 'id') {
    return true;
  }

  // 名前は大文字小文字を区別せずに比較
  if (property === 'name' && typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }

  // それ以外はデフォルトの比較方式を使用
  return undefined;
};

const user1 = { id: 1, name: 'Alice', age: 25 };
const user2 = { id: 999, name: 'ALICE', age: 25 };
isEqualWith(user1, user2, areValuesEqual); // true
```

#### パラメータ

- `a` (`unknown`): 比較する最初の値です。
- `b` (`unknown`): 比較する2番目の値です。
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): カスタム比較関数です。`true` または `false` を返す場合はその結果を使用し、`undefined` を返す場合はデフォルトの比較方式を使用します。

#### 戻り値

(`boolean`): カスタム基準に従って二つの値が等しい場合は `true`、そうでなければ `false` を返します。
