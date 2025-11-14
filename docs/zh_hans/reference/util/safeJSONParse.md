# safeJSONParse

安全地解析 JSON 字符串，不会抛出错误。

```typescript
const result = safeJSONParse(value);
```

## 用法

### `safeJSONParse(value)`

当您想安全地解析 JSON 字符串时，请使用 `safeJSONParse`。它可以在不冒 `JSON.parse` 异常风险的情况下进行解析。如果值是包含有效 JSON 的字符串，则返回解析后的结果。否则，`safeJSONParse` 返回 `null`。

在处理用户输入、松散类型的数据或无法保证值始终是有效 JSON 字符串的不可信源时特别有用。

```typescript
import { safeJSONParse } from 'es-toolkit/util';

// 有效的 JSON 字符串
safeJSONParse('{"name":"JinHo","age":29}'); // { name: "JinHo", age: 29 }
safeJSONParse('[1, 2, 3]'); // [1, 2, 3]
safeJSONParse('"hello world"'); // "hello world"
safeJSONParse('42'); // 42
safeJSONParse('true'); // true
safeJSONParse('false'); // false
safeJSONParse('null'); // null (有效 JSON，但解析值为 null)

// 无效的 JSON 字符串
safeJSONParse('invalid json'); // null
safeJSONParse('{"unclosed": "object"'); // null
safeJSONParse('[1,2,'); // null
safeJSONParse('undefined'); // null
safeJSONParse(''); // null

// 非字符串值
safeJSONParse({ name: 'JinHo' }); // null
safeJSONParse([1, 2, 3]); // null
safeJSONParse(42); // null
safeJSONParse(true); // null
safeJSONParse(null); // null
safeJSONParse(undefined); // null
```

### 使用泛型进行类型安全解析

您可以使用泛型参数 `T` 来描述解析后的 JSON 值的预期形状：

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
  // user 在这里被缩小为 User 类型
  console.log(user.id); // number
  console.log(user.name); // string
  console.log(user.isAdmin); // boolean
}
```

如果未提供类型参数，返回类型默认为 `unknown | null`：

```typescript
const result = safeJSONParse('{"name": "JinHo"}');
// result: unknown | null
```

您可以将 `safeJSONParse` 与您自己的类型守卫（例如 `isJSONObject`、`isJSONValue`）结合使用，以进一步验证解析后的结构。

### 与 isJSON 一起使用

`safeJSONParse` 旨在补充 `isJSON` 谓词：

- 当您只需要检查值是否为有效的 JSON 字符串时，请使用 `isJSON(value)`。
- 当您实际想要解析 JSON 字符串并使用结果时，请使用 `safeJSONParse(value)`。

```typescript
import { isJSON } from 'es-toolkit/predicate';
import { safeJSONParse } from 'es-toolkit/util';

function parseIfJson(input: unknown) {
  if (!isJSON(input)) {
    // input 不是有效的 JSON 字符串
    return null;
  }

  // input 现在被缩小为 string 类型
  const parsed = safeJSONParse(input);

  // parsed 是 JSON 值（或如果发生意外情况则为 null）
  return parsed;
}
```

### 实用示例

#### API 响应解析

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
      error: '响应正文不是有效的 JSON',
    };
  }

  if (!data.success) {
    return {
      success: false,
      error: 'API 报告失败',
    };
  }

  return {
    success: true,
    payload: data.payload,
  };
}
```

#### 用户输入解析

```typescript
import { safeJSONParse } from 'es-toolkit/util';

function tryParseUserConfig(input: unknown) {
  const config = safeJSONParse<Record<string, unknown>>(input);

  if (config === null) {
    return {
      isValid: false,
      config: null,
      error: '输入不是有效的 JSON',
    };
  }

  return {
    isValid: true,
    config,
    error: null,
  };
}
```

::: info 关于 "null" 字符串的说明

当输入是字符串 `"null"` 时，`safeJSONParse("null")` 返回 `null`，因为这是实际解析后的值。仅从返回值无法区分这是解析失败还是解析成功。如果您需要区分这两种情况，请结合使用 `isJSON` 和 `safeJSONParse`，或引入自定义结果类型。

:::

#### 参数

- `value` (`unknown`): 要解析为 JSON 的值。

#### 返回值

(`T | null`): 如果 `value` 是包含有效 JSON 的字符串，则返回解析后的 JSON 值；否则返回 `null`。

