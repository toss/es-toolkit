# toFormData

将一个对象转换为 `FormData` 实例，该实例用于在 Web 表单中传输键值对。此函数递归处理对象中的每个键值对，并将其附加到 `FormData` 实例中。它支持嵌套对象、数组、文件和各种 JavaScript 数据类型，并且可以通过配置选项灵活地处理复杂的数据结构。

- **深度转换**：递归将嵌套对象和数组转换为 `FormData` 格式。
- **支持文件**：自动处理 `File` 和 `Blob` 对象。
- **类型转换**：将常见的 JavaScript 数据类型（如 `boolean`、`BigInt`、`Date` 等）转换为 `FormData` 的字符串表示形式。
- **可配置行为**：提供选项以自定义数组、布尔值、空值和嵌套对象的处理方式。

## 签名

```typescript
function toFormData({
  data: Record<string, any>,
  formData = new FormData(),
  parentKey?: string,
  config = formDataOptions
}): FormData;
```

### 参数

- `data` (`Record<string, any>`): 要转换为 `FormData` 的对象。支持基本类型、数组、对象、`File`、`Blob` 和其他常见的数据类型。
- `formData` (`FormData`): 可选的现有 `FormData` 实例，用于将数据附加到其中。如果未提供，则创建新的 `FormData` 实例。
- `parentKey` (`string`): 处理嵌套对象和数组的可选键。在递归处理中内部使用。
- `config` (`object`): 自定义 `FormData` 转换行为的配置对象。

### 配置选项

- `allowEmptyArrays` (`boolean`): 当为 `true` 时，将空数组添加为空字符串。默认值为 `false`。
- `convertBooleansToIntegers` (`boolean`): 当为 `true` 时，将布尔值（`true` / `false`）转换为 `'1'` 和 `'0'`。默认值为 `false`。
- `ignoreNullValues` (`boolean`): 当为 `true` 时，`null` 值将被忽略，不添加到 `FormData` 中。默认值为 `false`。
- `noArrayNotationForFiles` (`boolean`): 当为 `true` 时，文件数组将不使用 `[]` 表记。默认值为 `false`。
- `noArrayNotationForNonFiles` (`boolean`): 当为 `true` 时，非文件数组将不使用 `[]` 表记。默认值为 `false`。
- `useDotNotationForObjects` (`boolean`): 当为 `true` 时，嵌套对象属性使用点表示法（例如：`parent.child`）而不是括号表示法（例如：`parent[child]`）。默认值为 `false`。

### 返回值

(`FormData`): 填充了对象的键值对的 `FormData` 实例。

### 数据类型支持

该函数可以处理多种 JavaScript 数据类型：

- `undefined`: 跳过，不会在 `FormData` 中创建条目。
- `null`: 添加空字符串 (`''`) 或根据 `ignoreNullValues` 配置忽略。
- `boolean`: 转换为 `'true'` 或 `'false'`，如果 `convertBooleansToIntegers` 为 `true`，则转换为 `'1'` 或 `'0'`。
- `BigInt`: 转换为字符串。
- `Date`: 转换为 ISO 字符串。
- `File` / `Blob`: 直接附加。
- `Array`: 根据配置，使用索引或无 `[]` 表记递归处理。
- `Object`: 根据配置，使用点表示法或括号表示法递归处理。

## 使用示例

### 基本用法和配置

```typescript
const obj = { name: 'John', age: 30, preferences: { color: 'blue', food: 'pizza' } };
const formData = toFormData({ data: obj, config: { useDotNotationForObjects: true } });
// formData 包含以下内容：
// "name" -> "John"
// "age" -> "30"
// "preferences.color" -> "blue"
// "preferences.food" -> "pizza"
```

### 处理文件和空数组

```typescript
const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
const obj = { name: 'John', profilePicture: file, tags: [] };
const formData = toFormData({ data: obj, config: { allowEmptyArrays: true } });
// formData 包含以下内容：
// "name" -> "John"
// "profilePicture" -> file
// "tags" -> ""
```

### 布尔值转换和忽略空值

```typescript
const obj = { isActive: true, age: null };
const formData = toFormData({ data: obj, config: { convertBooleansToIntegers: true, ignoreNullValues: true } });
// formData 包含以下内容：
// "isActive" -> "1"
// （没有 "age" 条目，因为忽略了 null 值）
```

### 处理嵌套对象和数组

```typescript
const obj = {
  name: 'Alice',
  hobbies: ['reading', 'gaming'],
  address: {
    street: '123 Main St',
    city: 'Wonderland',
  },
};
const formData = toFormData({ data: obj, config: { noArrayNotationForNonFiles: true } });
// formData 包含以下内容：
// "name" -> "Alice"
// "hobbies" -> ["reading", "gaming"] // 非文件数组不使用数组表记
// "address[street]" -> "123 Main St"
// "address[city]" -> "Wonderland"
```
