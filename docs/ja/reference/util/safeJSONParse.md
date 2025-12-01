# safeJSONParse

エラーをスローせずに JSON 文字列を安全にパースします。

```typescript
const result = safeJSONParse(value);
```

## 使用法

### `safeJSONParse(value)`

JSON 文字列を安全にパースしたい場合に `safeJSONParse` を使用してください。`JSON.parse` 例外を発生させるリスクなくパースできます。値が有効な JSON を含む文字列の場合、パースされた結果を返します。そうでない場合、`safeJSONParse` は `null` を返します。

ユーザー入力、緩く型付けされたデータ、または値が常に有効な JSON 文字列であるという保証がない信頼できないソースを扱う際に特に便利です。

```typescript
import { safeJSONParse } from 'es-toolkit/util';

// 有効な JSON 文字列
safeJSONParse('{"name":"JinHo","age":29}'); // { name: "JinHo", age: 29 }
safeJSONParse('[1, 2, 3]'); // [1, 2, 3]
safeJSONParse('"hello world"'); // "hello world"
safeJSONParse('42'); // 42
safeJSONParse('true'); // true
safeJSONParse('false'); // false
safeJSONParse('null'); // null (有効な JSON ですが、パースされた値が null)

// 無効な JSON 文字列
safeJSONParse('invalid json'); // null
safeJSONParse('{"unclosed": "object"'); // null
safeJSONParse('[1,2,'); // null
safeJSONParse('undefined'); // null
safeJSONParse(''); // null

// 文字列でない値
safeJSONParse({ name: 'JinHo' }); // null
safeJSONParse([1, 2, 3]); // null
safeJSONParse(42); // null
safeJSONParse(true); // null
safeJSONParse(null); // null
safeJSONParse(undefined); // null
```

### ジェネリックを使用した型安全なパース

ジェネリックパラメータ `T` を使用して、パースされた JSON 値の期待される形状を記述できます:

```typescript
import { safeJSONParse } from 'es-toolkit/util';

type User = {
  id: number;
  name: string;
  isAdmin: boolean;
};

const raw = '{"id":1,"name":"JinHo","isAdmin":false}';

const user = safeJSONParse<User>(raw);
// user: User | null

if (user !== null) {
  // user はここで User に型が絞り込まれます
  console.log(user.id); // number
  console.log(user.name); // string
  console.log(user.isAdmin); // boolean
}
```

型引数を提供しない場合、戻り値の型はデフォルトで `unknown | null` になります:

```typescript
const result = safeJSONParse('{"name": "JinHo"}');
// result: unknown | null
```

`safeJSONParse` を独自の型ガード(例: `isJSONObject`, `isJSONValue`)と組み合わせて、パースされた構造をさらに検証できます。

### isJSON と一緒に使用する

`safeJSONParse` は `isJSON` 述語を補完するように設計されています:

- 値が有効な JSON 文字列かどうかを確認するだけの場合は `isJSON(value)` を使用してください。
- JSON 文字列を実際にパースして結果を操作したい場合は `safeJSONParse(value)` を使用してください。

```typescript
import { isJSON } from 'es-toolkit/predicate';
import { safeJSONParse } from 'es-toolkit/util';

function parseIfJson(input: unknown) {
  if (!isJSON(input)) {
    // input は有効な JSON 文字列ではありません
    return null;
  }

  // input は string 型に絞り込まれます
  const parsed = safeJSONParse(input);

  // parsed は JSON 値(または予期しないことが発生した場合は null)です
  return parsed;
}
```

### 実用的な例

#### API レスポンスのパース

```typescript
import { safeJSONParse } from 'es-toolkit/util';

type ApiResponse = {
  success: boolean;
  payload?: unknown;
};

function handleApiResponse(responseBody: unknown) {
  const data = safeJSONParse<ApiResponse>(responseBody);

  if (data === null) {
    return {
      success: false,
      error: 'レスポンス本文が有効な JSON ではありません',
    };
  }

  if (!data.success) {
    return {
      success: false,
      error: 'API が失敗を報告しました',
    };
  }

  return {
    success: true,
    payload: data.payload,
  };
}
```

#### ユーザー入力のパース

```typescript
import { safeJSONParse } from 'es-toolkit/util';

function tryParseUserConfig(input: unknown) {
  const config = safeJSONParse<Record<string, unknown>>(input);

  if (config === null) {
    return {
      isValid: false,
      config: null,
      error: '入力が有効な JSON ではありません',
    };
  }

  return {
    isValid: true,
    config,
    error: null,
  };
}
```

::: info "null" 文字列に関する注意

入力が文字列 `"null"` の場合、`safeJSONParse("null")` は実際のパースされた値であるため `null` を返します。これは純粋に戻り値だけではパース失敗と区別できません。2つのケースを区別する必要がある場合は、`isJSON` と `safeJSONParse` を組み合わせるか、カスタム結果型を導入してください。

:::

#### パラメータ

- `value` (`unknown`): JSON としてパースする値です。

#### 戻り値

(`T | null`): `value` が有効な JSON を含む文字列の場合、パースされた JSON 値。そうでない場合、`null`。
