# isUndefined (Lodash 兼容性)

::: warning 使用 es-toolkit 的 [isUndefined](../../predicate/isUndefined.md)
这个 `isUndefined` 函数由于 Lodash 兼容性的复杂处理而运行较慢。

请使用更快且现代的 es-toolkit 的 [isUndefined](../../predicate/isUndefined.md)。
:::

检查值是否为 `undefined`。

```typescript
const result = isUndefined(value);
```

## 参考

### `isUndefined(x)`

当您想类型安全地检查值是否恰好为 `undefined` 时使用 `isUndefined`。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isUndefined } from 'es-toolkit/compat';

// 只有 undefined 返回 true
isUndefined(undefined); // true

// null 也返回 false
isUndefined(null); // false

// 所有其他值也返回 false
isUndefined(0); // false
isUndefined(''); // false
isUndefined(false); // false
isUndefined([]); // false
isUndefined({}); // false
isUndefined('undefined'); // false
isUndefined(NaN); // false
```

可以区分检查 `undefined` 和 `null`。

```typescript
import { isUndefined } from 'es-toolkit/compat';

function handleValue(value: string | null | undefined) {
  if (isUndefined(value)) {
    console.log('值为 undefined');
  } else if (value === null) {
    console.log('值明确为 null');
  } else {
    console.log(`有值: ${value}`);
  }
}

handleValue(undefined); // "值为 undefined"
handleValue(null); // "值明确为 null"
handleValue('hello'); // "有值: hello"
```

在检查未声明的变量或未初始化的属性时很有用。

```typescript
import { isUndefined } from 'es-toolkit/compat';

const obj: { name?: string; age?: number } = { name: 'John' };

if (isUndefined(obj.age)) {
  console.log('年龄未设置');
  obj.age = 25; // 设置默认值
}

// 函数参数的默认值处理
function greet(name: string, title?: string) {
  if (isUndefined(title)) {
    title = '先生/女士';
  }
  console.log(`您好，${name}${title}!`);
}

greet('张三'); // "您好，张三先生/女士!"
greet('张三', '老师'); // "您好，张三老师!"
```

#### 参数

- `x` (`any`): 要检查是否为 `undefined` 的值。

#### 返回值

(`x is undefined`): 如果值为 `undefined` 则返回 `true`，否则返回 `false`。
