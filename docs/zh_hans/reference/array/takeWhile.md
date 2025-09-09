# takeWhile

返回一个新数组，其中包含满足提供的谓词函数的前导元素。

一旦有一个元素不满足谓词，就停止获取元素。

## 签名

```typescript
function takeWhile<T>(arr: T[], shouldContinueTaking: (element: T) => boolean): T[];
```

### 参数

- `arr` (`T[]`): 要获取元素的数组。
- `shouldContinueTaking` (`(item: T) => boolean`): 谓词函数，对每个元素调用该函数。只要该函数返回 `true`，就将元素包含在结果中。

### 返回值

(`T[]`) 包含从数组开头获取的元素，直到谓词函数返回 `false` 的新数组。

## 示例

```typescript
// 返回 [1, 2]
takeWhile([1, 2, 3, 4], x => x < 3);

// 返回 []
takeWhile([1, 2, 3, 4], x => x > 3);
```

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `takeWhile` 以实现与 Lodash 的完全兼容。

您可以指定获取元素的条件，只要该条件评估为类似 `true` 的值，数组将从**开头**获取元素。

- **谓词函数**: 您可以提供一个谓词函数，该函数将应用于数组中的每个元素。函数返回类似 `true` 的值时，元素会被获取。当谓词首次返回类似 `false` 的值时，获取操作停止。
- **部分对象**: 您还可以提供一个部分对象，只要其属性与提供的对象属性匹配，函数就会从数组中获取元素。
- **属性-值对**: 或者，您可以指定一个属性-值对，函数将获取具有指定属性且与给定值匹配的元素。
- **属性名**: 最后，您可以提供一个属性名，函数将从数组开头获取元素，直到找到一个指定属性为类似 `false` 的值的元素。

### 签名

```typescript
function takeWhile<T>(array: ArrayLike<T> | null | undefined): T[];
function takeWhile<T>(
  array: ArrayLike<T> | null | undefined,
  predicate: (item: T, index: number, array: T[]) => unknown
): T[];
function takeWhile<T>(array: ArrayLike<T> | null | undefined, matches: Partial<T>): T[];
function takeWhile<T>(array: ArrayLike<T> | null | undefined, matchesProperty: [keyof T, unknown]): T[];
function takeWhile<T>(array: ArrayLike<T> | null | undefined, property: PropertyKey): T[];
```

### 示例

```typescript
// 使用谓词函数的示例
const array1 = [1, 2, 3, 4, 5];
const result1 = takeWhile(array1, x => x < 3);
// result1 将是 [1, 2]，因为小于 3 的元素被评估为类似 `true` 的值，并从开头获取，而首次遇到大于或等于 3 的值时停止。

// 使用部分对象的示例
const array2 = [{ a: 3 }, { a: 2 }, { a: 1 }];
const result2 = takeWhile(array2, { a: 3 });
// result2 将是 [{ a: 3 }]，因为第一个对象的属性与提供的部分对象匹配。

// 使用属性-值对的示例
const array3 = [{ id: 3 }, { id: 2 }, { id: 1 }];
const result3 = takeWhile(array3, ['id', 3]);
// result3 将是 [{ id: 3 }]，因为第一个对象的 id 属性与值 3 匹配。

// 使用属性名的示例
const array4 = [{ isActive: true }, { isActive: true }, { isActive: false }];
const result4 = takeWhile(array4, 'isActive');
// result4 将是 [{ isActive: true }, { isActive: true }]，因为 isActive 属性被评估为类似 `true` 的值，并从开头获取。

// 无条件时
const array5 = [1, 2, 3];
const result5 = takeWhile(array5);
// result5 将是 [1, 2, 3]，因为在没有条件的情况下，默认使用 identity 函数。

// null 或 undefined 数组
const result6 = takeWhile(null);
// result6 将是 []，因为输入数组为 null 或 undefined。
```
