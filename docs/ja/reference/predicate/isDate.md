# isDate

与えられた値が Date オブジェクトかどうかを確認します。

```typescript
const result = isDate(value);
```

## 使用法

### `isDate(value)`

日付オブジェクトかどうかを確認したい場合に `isDate` を使用してください。文字列や数値で表された日付と Date オブジェクトを区別する際に便利です。TypeScript で型ガードとして動作し、値の型を `Date` に絞り込みます。

```typescript
import { isDate } from 'es-toolkit/predicate';

// Date オブジェクトの確認
const date = new Date();
isDate(date); // true

// 他の型との区別
isDate('2024-01-01'); // false - 文字列
isDate(1640995200000); // false - タイムスタンプ
isDate({}); // false
```

TypeScript で型ガードとして使用する場合に特に便利です。

```typescript
import { isDate } from 'es-toolkit/predicate';

function formatDate(value: unknown): string {
  if (isDate(value)) {
    // value は Date に型が絞り込まれます
    return value.toISOString();
  }
  return '有効な日付ではありません';
}
```

API レスポンスの処理やユーザー入力の検証に活用できます。

```typescript
import { isDate } from 'es-toolkit/predicate';

// API レスポンスの処理
function processResponse(response: { createdAt: unknown }) {
  if (isDate(response.createdAt)) {
    console.log(`作成時刻: ${response.createdAt.toLocaleDateString()}`);
  }
}

// 日付の妥当性検証
function validateBirthDate(value: unknown): boolean {
  if (isDate(value)) {
    const now = new Date();
    const minAge = new Date(now.getFullYear() - 150, now.getMonth(), now.getDate());

    return value <= now && value >= minAge;
  }
  return false;
}
```

#### パラメータ

- `value` (`unknown`): Date オブジェクトかどうかを確認する値です。

#### 戻り値

(`value is Date`): 値が Date オブジェクトの場合は `true`、そうでなければ `false` を返します。
