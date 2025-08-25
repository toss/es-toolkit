# isEqualWith

使用自定义比较函数比较两个值是否相等。

自定义函数允许对比较过程进行细致的控制。如果它返回布尔值，则该结果决定相等性。如果返回 `undefined`，则该函数将回退到[isEqual](./isEqual.md)中的默认相等比较。

此函数还使用自定义相等函数比较对象、数组、`Map`、`Set`和其他复杂结构中的值，确保进行深度比较。

这种方法在处理复杂比较时提供了灵活性，同时保持了对简单情况的高效默认行为。

自定义比较函数最多可以接受六个参数：

- `x`: 第一个对象`a`中的值。
- `y`: 第二个对象`b`中的值。
- `property`: 属性键（如果适用）。
- `xParent`: 第一个值的父对象。
- `yParent`: 第二个值的父对象。
- `stack`: 用于处理循环引用的内部堆栈（映射）。

## 签名

```typescript
function isEqualWith(
  a: any,
  b: any,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
): boolean;
```

### 参数

- `a` (`any`): 要比较的第一个值。
- `b` (`any`): 要比较的第二个值。
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): 用于表示如何比较两个值的比较函数。它可以返回一个布尔值，表示两个值是否相等。如果返回 `undefined`，则使用默认方法进行比较。
  - `x`: 属于第一个对象 `a` 的值。
  - `y`: 属于第二个对象 `b` 的值。
  - `property`: 用于获取 `x` 和 `y` 的属性键。
  - `xParent`: 第一个值 `x` 的父级。
  - `yParent`: 第二个值 `y` 的父级。
  - `stack`: 用于处理循环引用的内部栈（`Map`）。

### 返回值

(`boolean`): `true`如果根据自定义比较器值相等，否则为`false`。

## 示例

```typescript
const customizer = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};
isEqualWith('Hello', 'hello', customizer); // true
isEqualWith({ a: 'Hello' }, { a: 'hello' }, customizer); // true
isEqualWith([1, 2, 3], [1, 2, 3], customizer); // true
```
