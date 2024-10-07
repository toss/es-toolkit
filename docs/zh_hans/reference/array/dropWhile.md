# dropWhile

从数组开头移除元素，直到谓词函数返回 `false`。

该函数迭代数组，并从开头开始移除元素，直到提供的谓词函数返回 `false` 为止。然后返回剩余元素组成的新数组。

## 签名

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T, index: number, arr: T[]) => boolean): T[];
```

### 参数

- `arr` (`T[]`): 要从中移除元素的数组。
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 一个谓词函数，用于确定是否继续移除元素。该函数会与每个元素、其索引及数组一起调用，只要返回 `true`，移除操作就会继续。

### 返回值

(`T[]`) 谓词函数返回 `false` 后剩余的元素组成的新数组。

## 示例

```typescript
const array = [1, 2, 3, 4, 5];
const result = dropWhile(array, x => x < 3);
// 结果将是 [3, 4, 5]，因为小于 3 的元素从开头被移除了。
```

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `dropWhile` 以实现与 lodash 的完全兼容。

您可以指定移除元素的条件，只要该条件评估为 true，数组将从开头移除项目。

- **谓词函数**：您可以提供一个谓词函数，该函数将应用于数组中的每个项目。该函数应返回 `true`，以指示应移除的元素。移除操作将持续进行，直到谓词第一次返回 `false`。
- **部分对象**：您还可以提供一个部分对象，只要其属性与提供的对象的属性匹配，函数就会从数组中移除元素。
- **属性-值对**：或者，您可以指定一个属性-值对，函数将移除具有指定属性且与给定值匹配的元素。
- **属性名**：最后，您可以提供一个属性名，函数将从数组中移除元素，直到找到一个指定属性为真值的元素。

### 签名

```typescript
function dropWhile<T>(arr: ArrayLike<T>, canContinueDropping: (item: T, index: number, arr: T[]) => unknown): T[];
function dropWhile<T>(arr: ArrayLike<T> objectToDrop: Partial<T>): T[];
function dropWhile<T>(arr: ArrayLike<T>, propertyToDrop: [keyof T, unknown]): T[];
function dropWhile<T>(arr: ArrayLike<T>, propertyToDrop: string): T[];
```

### 示例

```typescript
// 使用谓词函数的示例
const array1 = [1, 2, 3, 4, 5];
const result1 = dropWhile(array1, x => x < 3);
// result1 将是 [3, 4, 5]，因为小于 3 的元素被移除了。

// 使用部分对象的示例
const array2 = [{ a: 1 }, { a: 2 }, { a: 3 }];
const result2 = dropWhile(array2, { a: 1 });
// result2 将是 [{ a: 2 }, { a: 3 }]，因为第一个对象与提供的对象的属性匹配。

// 使用属性-值对的示例
const array3 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result3 = dropWhile(array3, ['id', 1]);
// result3 将是 [{ id: 2 }, { id: 3 }]，因为第一个对象的 id 属性与值 1 匹配。

// 使用属性名的示例
const array4 = [{ isActive: true }, { isActive: true }, { isActive: false }];
const result4 = dropWhile(array4, 'isActive');
// result4 将是 [{ isActive: false }]，因为它会移除元素，直到找到一个 isActive 属性为假值的元素。
```
