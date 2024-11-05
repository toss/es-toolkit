# iteratee

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::
创建一个函数，该函数从集合中的元素返回一个值。

你可以使用以下类型的参数调用 `iteratee`：

- **函数**: 返回原样的函数，该函数将使用集合中的元素进行调用。
- **属性名**: 返回元素中指定属性的值。
- **属性-值对**: 返回一个布尔值，指示元素的属性是否与给定值匹配。
- **部分对象**: 返回一个布尔值，指示元素是否与部分对象的属性匹配。

如果你不提供任何参数或传递 `null`，此函数将返回一个[简单返回其输入的函数](../../function/identity.md)。

## 签名

```typescript
function iteratee(value?: null): (value: T) => T;
function iteratee<F extends (...args: any[]) => unknown>(func: F): F;
function iteratee(value: symbol | number | string | object): (...args: any[]) => any;
function iteratee(
  value?: symbol | number | string | object | null | ((...args: any[]) => unknown)
): (...args: any[]) => any;
```

### 参数

- `value` (`symbol | number | string | object | null | ((...args: any[]) => any)`): 将要转换为迭代器的值。

### 返回值

(`(...args: any[]) => unknown`): 返回新的迭代器函数。

## 示例

```typescript
const func = iteratee();
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [{ a: 1 }, { a: 2 }, { a: 3 }]

const func = iteratee((object) => object.a);
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]

const func = iteratee('a');
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]

const func = iteratee({ a: 1 });
[{ a: 1 }, { a: 2 }, { a: 3 }].find(iteratee({ a: 1 })) // => { a: 1 }

const func = iteratee(['a', 1]);
[{ a: 1 }, { a: 2 }, { a: 3 }].find(iteratee(['a', 1])) // => { a: 1 }
```
