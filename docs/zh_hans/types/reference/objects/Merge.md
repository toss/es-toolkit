# Merge

创建将两个对象类型深度合并后的类型。

```typescript
type Result = Merge<Target, Source>;
```

## 用法

### `Merge<T, S>`

当你需要表示两个对象深度合并后的结果类型时使用。例如,可以表示用 [merge](../../../reference/object/merge.md) 将覆盖项应用到默认配置后的结果类型。

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = { host: string; port: number };
type Overrides = { debug: boolean };

type Config = Merge<Defaults, Overrides>;
// => { host: string; port: number; debug: boolean }
```

嵌套对象也可以合并。TypeScript 内置的合并类型 `T & S` 不会合并嵌套对象,而使用 `Merge` 类型则可以合并。

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { server: { host: string; port: number } };
type Source = { server: { tls: boolean } };

type Result = Merge<Target, Source>;
// => { server: { host: string; port: number; tls: boolean } }
```

当存在重叠的键时,使用第二个对象的值类型。TypeScript 内置的合并类型 `T & S` 会把重叠键的值显示为 `never`,而使用 `Merge` 类型时,会使用第二个对象的值类型。

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { id: string; value: string };
type Source = { value: number };

type Result = Merge<Target, Source>;
// => { id: string; value: number }

type Broken = Target & Source;
// => { id: string; value: never } (string & number 会变成 never)
```

### 结果类型的决定规则

按顺序应用第一条匹配的规则。两个对象共有的每个键都会再次应用同样的规则。

1. 如果两个类型完全相同,则原样返回该类型。
2. 如果两者都是普通对象,则逐键合并。只存在于一侧的键会被保留。
3. 如果一个类型可以赋值给另一个,则使用更宽的类型。如果两者可以互相赋值,则使用第一个类型。
4. 否则,元组按索引合并,普通数组会变成包含两种元素类型的数组,其他值(原始类型、`Date`、`Map`、函数等)会被第二个值替换。

规则 1 和规则 3 能保持联合类型不变。如果没有这两条规则,`string | string[] | string[][]` 这样的联合类型会被逐成员合并,结果会比输入更宽。

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { color: string | string[] | string[][]; label: 'a' | 'b' | (string & {}) };

type Same = Merge<Options, Options>;
// => Options (规则 1)

type Override = Merge<Options, { color: string[] }>;
// => Options (规则 3: string[] 可以赋值给 Options['color'])

type Extra = Merge<{ a: number }, { a: number; b: string }>;
// => { a: number; b: string } (规则 2 先于规则 3 应用,因此保留了 `b`)
```

#### 类型参数

- `T`: 目标对象的类型。
- `S`: 要合并到 `T` 中的源对象的类型。
