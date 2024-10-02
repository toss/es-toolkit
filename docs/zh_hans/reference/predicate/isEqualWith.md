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

- `a` (`unknown`): 要比较的第一个值。
- `b` (`unknown`): 要比较的第二个值。
- `areValuesEqual` (`Function`): 自定义比较函数。
  如果它返回布尔值，该结果将被使用。如果它返回undefined，
  将使用默认的相等比较。

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
