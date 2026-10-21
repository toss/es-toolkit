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

合并两个类型相同的对象,会得到同一个类型。即使其中包含 `string[] | string[][]` 这样的联合类型也是如此。

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { value: string[] | string[][] };

type Result = Merge<Options, Options>;
// => { value: string[] | string[][] }
```

当第二个对象的数组能放进第一个对象的数组类型时,保留第一个对象的类型。把 `string[]` 合并进 `string[] | string[][]` 后仍然是 `string[] | string[][]`,因此合并后的配置可以直接赋值给原来的选项类型。字符串、数字等不会被合并的值,则如上所示采用第二个对象的类型。

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { value: string[] | string[][] };

type Result = Merge<Options, { value: string[] }>;
// => { value: string[] | string[][] }
```

只存在于第二个对象上的键总会被保留,即使第二个对象拥有第一个对象的全部键。普通对象会先逐键合并,然后才把两个类型作为整体进行比较。

```typescript
import type { Merge } from 'es-toolkit/types';

type Result = Merge<{ a: number }, { a: number; b: string }>;
// => { a: number; b: string }
```

#### 类型参数

- `T`: 目标对象的类型。
- `S`: 要合并到 `T` 中的源对象的类型。
