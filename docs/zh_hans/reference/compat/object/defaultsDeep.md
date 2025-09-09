# defaultsDeep

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

类似于 [defaults](./defaults.md) 函数，但递归地为嵌套对象分配默认值。

> 注意：此函数会修改第一个参数 `object`。

## 签名

```typescript
function defaultsDeep<T extends object>(object: T): NonNullable<T>;
function defaultsDeep<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function defaultsDeep<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function defaultsDeep<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### 参数

- `object` (`T`): 接收默认值的目标对象。
- `sources` (`S[]`): 提供默认值的一个或多个源对象。

### 返回值

(`object`): 应用了默认值的目标对象。

## 示例

```typescript
// 基本用法
defaultsDeep({ a: 1 }, { a: 2, b: 2 }); // { a: 1, b: 2 }

// 嵌套对象合并
defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 });
// { a: { b: 2, c: 3 }, d: 4 }

// null值不会被覆盖
defaultsDeep({ a: { b: null } }, { a: { b: 2 } }); // { a: { b: null } }

// undefined值会被覆盖
defaultsDeep({ a: { b: undefined } }, { a: { b: 2 } }); // { a: { b: 2 } }

// 使用多个源对象
defaultsDeep({ a: { b: 2 } }, { a: { c: 3 } }, { d: 4 });
// { a: { b: 2, c: 3 }, d: 4 }

// 处理循环引用
const obj1 = { foo: { b: { c: { d: {} } } }, bar: { a: 2 } };
const obj2 = { foo: { b: { c: { d: {} } } }, bar: {} };
obj1.foo.b.c.d = obj1; // 创建循环引用
obj2.foo.b.c.d = obj2; // 创建循环引用
obj2.bar.b = obj2.foo.b; // 交叉引用
const result = defaultsDeep(obj1, obj2);
// 循环引用和引用结构被正确维护
```
