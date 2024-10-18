# toFormData

将一个对象转换为 `FormData` 实例，该实例用于在 Web 表单中传输键值对。此函数递归处理对象中的每个键值对，并将其附加到 `FormData` 实例中。它支持嵌套对象、数组、文件和各种 JavaScript 数据类型，非常适合处理复杂的数据结构。

- **深度转换**：递归将嵌套对象和数组转换为 `FormData` 格式。
- **支持文件**：自动处理 `File` 和 `Blob` 对象。
- **类型转换**：将常见的 JavaScript 数据类型（如 `boolean`、`BigInt`、`Date` 等）转换为 `FormData` 的字符串表示形式。

## 签名

```typescript
function toFormData(data: any, formData?: FormData, parentKey?: string): FormData;
```

### 参数

- `data` (`any`): 要转换为 `FormData` 的对象。支持基本类型、数组、对象、`File`、`Blob` 和其他常见的数据类型。
- `formData` (`FormData`): 可选的现有 `FormData` 实例，用于将数据附加到其中。如果未提供，则创建新的 `FormData` 实例。
- `parentKey` (`string`): 处理嵌套对象和数组的可选键。在递归处理中内部使用。

### 返回值

(`FormData`): 填充了对象的键值对的 `FormData` 实例。

### 数据类型支持

该函数可以处理多种 JavaScript 数据类型：

- `undefined`: 跳过，不会在 `FormData` 中创建条目。
- `null`: 添加空字符串 (`''`)。
- `boolean`: 转换为 `'true'` 或 `'false'`。
- `BigInt:` 转换为字符串。
- `Date`: 转换为 ISO 字符串。
- `File` / `Blob`: 直接附加。
- `Array`: 递归处理并使用基于索引的键。
- `Object`: 递归处理并使用嵌套键。

## 基本使用示例

```typescript
const obj = { name: 'John', age: 30, preferences: { color: 'blue', food: 'pizza' } };
const formData = toFormData(obj);
// formData 包含以下内容：
// "name" -> "John"
// "age" -> "30"
// "preferences[color]" -> "blue"
// "preferences[food]" -> "pizza"
```

### 处理文件和 Blob

```typescript
const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
const obj = { name: 'John', profilePicture: file };
const formData = toFormData(obj);
// formData 包含以下内容：
// "name" -> "John"
// "profilePicture" -> file
```

### 处理 BigInt 和复杂数据类型

```typescript
const obj = { bigNumber: BigInt(12345678901234567890), createdAt: new Date() };
const formData = toFormData(obj);
// formData 包含以下内容：
// "bigNumber" -> "12345678901234567890"
// "createdAt" -> "2024-10-17T12:00:00.000Z"
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
const formData = toFormData(obj);
// formData 包含以下内容：
// "name" -> "Alice"
// "hobbies[0]" -> "reading"
// "hobbies[1]" -> "gaming"
// "address[street]" -> "123 Main St"
// "address[city]" -> "Wonderland"
```
