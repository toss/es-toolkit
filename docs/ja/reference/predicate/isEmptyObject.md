# isEmptyObject

プロパティが一つもないプレーンオブジェクト(`{}`)かどうかを確認します。

```typescript
const result = isEmptyObject(value);
```

## 使用法

### `isEmptyObject(value)`

`{}`のようにプロパティが一つもないプレーンオブジェクトかどうかを確認したい場合に `isEmptyObject` を使用してください。配列、Map、Setなどの他のオブジェクト型は `false` を返します。

```typescript
import { isEmptyObject } from 'es-toolkit';

// プロパティがないプレーンオブジェクト
isEmptyObject({}); // true
isEmptyObject(new Object()); // true
isEmptyObject(Object.create(null)); // true

// プロパティがあるオブジェクト
isEmptyObject({ a: 1 }); // false
isEmptyObject({ key: 'value' }); // false

// プレーンオブジェクトではない型
isEmptyObject([]); // false (配列)
isEmptyObject(null); // false
isEmptyObject(new Map()); // false
isEmptyObject(new Set()); // false
```

#### パラメータ

- `value` (`unknown`): 確認する値です。

#### 戻り値

(`value is Record<PropertyKey, never>`): プロパティがないプレーンオブジェクトの場合は `true`、そうでなければ `false` を返します。
