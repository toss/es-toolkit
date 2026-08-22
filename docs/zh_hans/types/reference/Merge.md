# Merge

创建将两个对象类型深度合并后的类型。

```typescript
type Result = Merge<Target, Source>;
```

## 用法

### `Merge<T, S>`

当你需要表示两个对象深度合并后的结果类型时使用。例如,可以表示用 [merge](../../reference/object/merge.md) 将覆盖项应用到默认配置后的结果类型。

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

#### 类型参数

- `T`: 目标对象的类型。
- `S`: 要合并到 `T` 中的源对象的类型。
