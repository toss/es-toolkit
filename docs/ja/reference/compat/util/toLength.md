# toLength (Lodash 互換性)

値を有効な配列インデックスに変換します。

```typescript
const length = toLength(value);
```

## 使用法

### `toLength(value)`

値を有効な配列インデックスに変換します。0以上2^32-1以下の整数に制限します。

```typescript
import { toLength } from 'es-toolkit/compat';

// 小数を整数に変換
toLength(3.2);
// Returns: 3

// 負数は0に変換
toLength(-1);
// Returns: 0

// 文字列数値を変換
toLength('42');
// Returns: 42

// 非常に大きい数は制限値に変換
toLength(Number.MAX_VALUE);
// Returns: 4294967295
```

nullやundefinedは0に変換します。

```typescript
import { toLength } from 'es-toolkit/compat';

toLength(null);
// Returns: 0

toLength(undefined);
// Returns: 0
```

#### パラメータ

- `value` (`unknown`): 変換する値です。

#### 戻り値

(`number`): 0以上2^32-1以下の有効な配列インデックスを返します。
