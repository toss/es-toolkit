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

合并两个数组类型时,元组会按索引合并,其他数组则会变成同时包含两边元素类型的数组类型。

```typescript
import type { Merge } from 'es-toolkit/types';

type Result = Merge<{ list: number[] }, { list: string[] }>;
// => { list: Array<string | number> }

type Tuple = Merge<[1, 2, 3], ['a']>;
// => ['a', 2, 3]
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

如果存在相同的键,第二个对象的类型会直接成为结果。

合并原始值、`Date`、`Map`、`Set`、函数等非普通对象的类型时,会使用第二个值的类型。

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { createdAt: Date; onChange: () => void; label: string };
type Source = { createdAt: string; onChange: (value: string) => void; label: 'a' | 'b' };

type Result = Merge<Target, Source>;
// => { createdAt: string; onChange: (value: string) => void; label: 'a' | 'b' }
```

第一个对象中可能为 `null` 或 `undefined` 的值,只要第二个对象中有值,就会从结果类型中消失。

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = { retry?: { count: number }; tags: string[] | null };
type Overrides = { retry: { count: number }; tags: string[] };

type Result = Merge<Defaults, Overrides>;
// => { retry: { count: number }; tags: string[] }
```

#### 类型参数

- `T`: 目标对象的类型。
- `S`: 要合并到 `T` 中的源对象的类型。
