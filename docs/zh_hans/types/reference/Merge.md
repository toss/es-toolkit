# Merge

将两个对象类型深度合并为一个类型。这是 [`merge`](../../reference/object/merge.md) 的返回类型。内置的交叉类型 `T & S` 在嵌套属性重叠时可能坍缩为 `never`,而 `Merge<T, S>` 会像 `merge` 在运行时那样逐个属性地合并。

```typescript
type Result = Merge<Target, Source>;
```

## 用法

### `Merge<T, S>`

当你需要表示将源对象深度合并到目标对象后的结果类型时使用。例如,可以表示用 [`merge`](../../reference/object/merge.md) 将覆盖项应用到默认配置后得到的配置对象类型。

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = {
  server: { host: string; port: number };
  debug: boolean;
};

type Overrides = {
  server: { port: 8080; tls: boolean };
};

type Config = Merge<Defaults, Overrides>;
// => { server: { host: string; port: 8080; tls: boolean }; debug: boolean }
```

#### 合并规则

结果遵循 `merge` 在运行时应用的规则。

- **只存在于一侧的键**: 原样保留,并保持可选性。
- **两侧都是普通对象**: 递归合并。
- **两侧都是数组**: 元组按索引逐个合并;其他数组则变为包含两侧元素类型的数组。
- **源值可能为 `undefined`**: 由于 `merge` 不会用 `undefined` 覆盖已定义的值,因此保留目标类型。
- **不可合并的值** (函数、`Date`、`RegExp`、`Map`、`Set` 等非普通对象): 源值会替换目标值。
- **数组遇到普通对象**: 由于 `merge` 会把源的属性赋值到目标上,因此两侧的属性都会保留(`T & S`)。

```typescript
import type { Merge } from 'es-toolkit/types';

// 元组按索引逐个合并。
type A = Merge<{ a: [1, 2] }, { a: [3] }>; // { a: [3, 2] }

// 可能为 undefined 的源值不会覆盖目标。
type B = Merge<{ a: number }, { a?: string }>; // { a: number | string }

// 非普通对象不会被合并,而是被替换。
type C = Merge<{ at: { x: number } }, { at: Date }>; // { at: Date }
```

#### 类型参数

- `T`: 目标对象的类型。
- `S`: 要合并到 `T` 中的源对象的类型。
