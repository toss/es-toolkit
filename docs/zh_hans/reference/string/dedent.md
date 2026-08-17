# dedent

从多行字符串的每一行中移除共同的前导缩进。

即使按照代码的缩进书写多行字符串，缩进也不会出现在实际的字符串中。

```typescript
const text = dedent`
  Hello
  World
`;
```

## 用法

### `` dedent`text` ``

当您想在有缩进的代码中书写多行字符串时，请将 `dedent` 用作标签模板字面量。它会找出非空行共同拥有的最小缩进，并从每一行中移除，因此行与行之间的相对缩进差异会被保留。如果第一行或最后一行只包含空白，则会被移除。

```typescript
import { dedent } from 'es-toolkit/string';

// 代码中的缩进会被移除
const message = dedent`
  Hello
  World
`;
// message 是 'Hello\nWorld'

// 行与行之间的相对缩进会被保留
const list = dedent`
  Items:
    - First
    - Second
`;
// list 是 'Items:\n  - First\n  - Second'

// 插值会在移除缩进之前插入
const name = 'es-toolkit';
const greeting = dedent`
  Hello, ${name}!
`;
// greeting 是 'Hello, es-toolkit!'
```

只包含空白的行会变成空行，Windows 换行符（`\r\n`）会被规范化为 `\n`。

```typescript
import { dedent } from 'es-toolkit/string';

// 只包含空白的行会变成空行
const text = dedent`
  First

  Second
`;
// text 是 'First\n\nSecond'
```

#### 参数

- `str` (`TemplateStringsArray`): 要移除缩进的模板字面量。
- `values` (`unknown[]`): 要插入到模板字面量中的值。

#### 返回值

(`string`): 移除了共同前导缩进的字符串。

### `dedent(str)`

当您已经有一个字符串时（例如从文件中读取的，或在代码其他地方生成的），请将 `dedent` 用作普通函数。

```typescript
import { dedent } from 'es-toolkit/string';

// 从已有的字符串中移除共同的缩进
const raw = '  Hello\n    World';
const text = dedent(raw);
// text 是 'Hello\n  World'
```

#### 参数

- `str` (`string`): 要移除缩进的字符串。

#### 返回值

(`string`): 移除了共同前导缩进的字符串。

### `dedent(tagFn)`

如果您想与其他标签函数组合使用，请像 `dedent(tagFn)` 一样将标签函数作为参数传入。这样创建的新标签函数会接收到已经移除共同缩进的模板字符串。

```typescript
import { dedent } from 'es-toolkit/string';

// 执行接收到的 Python 代码的标签函数
function pythonInterpreter(strings: TemplateStringsArray, ...values: unknown[]) {
  return runPython(strings.join(''));
}

// 用 dedent 包装后，它会接收到移除缩进后的代码
const python = dedent(pythonInterpreter);

python`
  def greet():
      print("Hello!")

  greet()
`;
// pythonInterpreter 接收到的代码是:
// 'def greet():\n    print("Hello!")\n\ngreet()'
```

#### 参数

- `tagFn` (`(strings: TemplateStringsArray, ...values: unknown[]) => T`): 要组合的标签函数。

#### 返回值

(`(strings: TemplateStringsArray, ...values: unknown[]) => T`): 返回一个新的标签函数，它会先移除模板字符串中共同的前导缩进，再将其传给 `tagFn`。
