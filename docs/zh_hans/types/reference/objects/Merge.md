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

把一个类型与它自身合并,会得到同一个类型。这对 `string | string[] | string[][]` 这样的联合类型尤其重要:否则 TypeScript 会把联合成员的每一对组合都合并一遍,产生比输入更宽的类型,结果就无法再赋值回原来的类型。

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { color: string | string[] | string[][]; label: 'a' | 'b' | (string & {}) };

type Result = Merge<Options, Options>;
// => Options
```

当两个值的类型相关时,保留更宽的那个。用更窄的值覆盖默认值时仍保留默认值的类型,因此合并后的配置可以直接赋值给原来的选项类型。

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { color: string | string[] | string[][]; size: number };

type Result = Merge<Options, { color: string[]; size: 12 }>;
// => Options
```

只存在于第二个对象上的键总会被保留,即使第二个对象是第一个对象的子类型。普通对象会先逐键合并,然后才把两个类型作为整体进行比较。

```typescript
import type { Merge } from 'es-toolkit/types';

type Result = Merge<{ a: number }, { a: number; b: string }>;
// => { a: number; b: string }
```

#### 类型参数

- `T`: 目标对象的类型。
- `S`: 要合并到 `T` 中的源对象的类型。
