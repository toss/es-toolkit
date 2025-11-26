# isBoolean

与えられた値が真偽値かどうかを確認します。

```typescript
const result = isBoolean(value);
```

## 使用法

### `isBoolean(value)`

値が正確に `true` または `false` かどうかを確認したい場合に `isBoolean` を使用してください。TypeScript で型ガードとして動作し、値の型を `boolean` に絞り込みます。

```typescript
import { isBoolean } from 'es-toolkit/predicate';

// 基本的な真偽値の確認
isBoolean(true); // true
isBoolean(false); // true

// 他の型との区別
isBoolean(1); // false
isBoolean(0); // false
isBoolean('true'); // false
isBoolean('false'); // false
```

TypeScript で型ガードとして使用する場合に特に便利です。

```typescript
import { isBoolean } from 'es-toolkit/predicate';

function processValue(value: unknown) {
  if (isBoolean(value)) {
    // value は boolean に型が絞り込まれます
    console.log(value ? '真です' : '偽です');
  } else {
    console.log('真偽値ではありません');
  }
}
```

API レスポンスやユーザー入力の検証にも活用できます。

```typescript
import { isBoolean } from 'es-toolkit/predicate';

// API レスポンスの検証
interface APIResponse {
  success: unknown;
  data: any;
}

function validateResponse(response: APIResponse) {
  if (isBoolean(response.success)) {
    console.log(`API 呼び出し ${response.success ? '成功' : '失敗'}`);
    return response.success;
  }
  console.log('不正なレスポンス形式です');
  return false;
}
```

#### パラメータ

- `value` (`unknown`): 真偽値かどうかを確認する値です。

#### 戻り値

(`boolean`): 値が `true` または `false` の場合は `true`、そうでなければ `false` を返します。
