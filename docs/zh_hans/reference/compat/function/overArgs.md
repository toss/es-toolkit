# overArgs

::: info
此函数只能从用于兼容性的 `es-toolkit/compat` 中导入。这是因为存在可替代它的原生 JavaScript API，或者因为它尚未完全优化。

从 `es-toolkit/compat` 导入此函数时，其行为与 [lodash 完全相同](../../../compatibility.md)。
:::

`overArgs` 创建一个新函数，该函数在调用目标函数 (`func`) 时，会根据预先指定的转换规范 (`transformsArgs`) 来处理传入的参数。这些转换规范会在参数传递给原始 `func` 之前，分别应用于每个参数。

`transformsArgs` 可以作为独立参数或嵌套数组提供，在函数内部进行扁平化处理后，每个元素都被用作一个转换规范。

每个转换规范（`value`）会被解析并转换为应用于对应参数的转换函数，解析规则如下：

- `function`: 用作直接应用于对应参数的函数。
- `null` 或 `undefined`: 对应的参数不会改变，直接传递（即 `identity`）。
- 长度为 2 的 `Array`，`[path, value]`: 假定对应的参数是对象，会被转换为一个断言函数，用于检查通过 `property(path)` 获取的值是否与 `value` 相等（使用 `matchesProperty(path, value)`）。
- `object` (非数组): 假定对应的参数是对象，会被转换为一个断言函数，用于检查对象属性是否与该对象匹配（使用 `matches(object)`）。
- `string`、`number`、`boolean`、`symbol`: 假定对应的参数是对象，会被转换为一个函数，用于使用该值作为属性路径/键来访问值（使用 `property(path/key)`）。`boolean` 值会被转换为字符串 `'true'` 或 `'false'` 后使用。
- 其他类型: 对应的参数不会改变，直接传递（即 `identity`）。

转换会应用于新函数的前 `n` 个参数，其中 `n` 是扁平化后的转换规范数量。超出转换数量的参数会不变地传递给原始函数。

## 签名

```typescript
function overArgs<TFunc extends (...args: any[]) => any>(
  func: TFunc,
  ...transformsArgs: Array<OverArgsTransformArg>
): (...args: any[]) => ReturnType<TFunc>; // 返回的新函数参数类型简化为 any[]
```

### 参数

- func (TFunc extends (...args: any[]) => any): 将被转换后的参数调用的目标函数。
- transformsArgs (Array<OverArgsTransformArg>): 应用于参数的转换规范。可以作为独立参数或嵌套数组提供。每个规范的类型如上所述。

### 返回值

- (...args: any[]) => ReturnType<TFunc>: 返回一个应用了参数转换的新函数。

## 示例

```typescript
import { overArgs } from 'es-toolkit/compat';

// 返回参数数组的辅助函数
function fn(...args) {
  return args;
}

// 1. 函数转换规范示例
const squareAndCube = (a, b) => `Square: ${a}, Cube: ${b}`;
const processNumbers = overArgs(
  squareAndCube,
  n => n * n,
  n => n * n * n
);

console.log('Example 1 (Function transforms):');
console.log(processNumbers(2, 3));
// => Square: 4, Cube: 27 (2 被转换为 2*2=4, 3 被转换为 3*3*3=27 后传递给 squareAndCube)

// 2. 属性路径 (string) 转换规范示例
const formatUserInfo = (name, age) => `Name: ${name}, Age: ${age}`;
const processUserObject = overArgs(formatUserInfo, 'name', 'age');

console.log('\nExample 2 (Property string transforms):');
console.log(processUserObject({ name: 'Alice', age: 30, city: 'Seoul' }, { name: 'Bob', age: 25, city: 'Busan' }));
// => Name: Alice, Age: 25 (从第一个对象提取 'name' 属性, 从第二个对象提取 'age' 属性后传递给 formatUserInfo)

// 3. 对象匹配器转换规范示例
// (假定 match 函数工作正常)
const checkAndGet = (isMatch, value) => `Match: ${isMatch}, Value: ${value}`;
const processObjectMatch = overArgs(checkAndGet, { id: 1 }, 'name');

console.log('\nExample 3 (Object matcher + Property string):');
console.log(processObjectMatch({ id: 1, name: 'Item A' }, { id: 2, name: 'Item B' }));
// => Match: true, Value: Item B ({ id: 1, name: 'Item A' } 与 { id: 1 } 匹配, 因此结果为 true; 从 { id: 2, name: 'Item B' } 提取 'name')

// 4. [path, value] 数组匹配器转换规范示例
const checkPropertyValue = isMatch => `Property matches: ${isMatch}`;
const processArrayMatch = overArgs(checkPropertyValue, ['status', 'active']);

console.log('\nExample 4 ([path, value] matcher):');
console.log(processArrayMatch({ status: 'active', type: 'user' }));
// => Property matches: true ({ status: 'active', type: 'user' } 的 'status' 属性与 'active' 相等, 因此结果为 true)
console.log(processArrayMatch({ status: 'inactive', type: 'admin' }));
// => Property matches: false ({ status: 'inactive', type: 'admin' } 的 'status' 属性与 'active' 不相等, 因此结果为 false)

// 5. boolean 转换规范示例
const processBooleanKeys = overArgs(fn, true, false);
const objWithBooleanKeys = { true: 'Enabled', false: 'Disabled' };

console.log('\nExample 5 (Boolean transforms):');
console.log(processBooleanKeys(objWithBooleanKeys, objWithBooleanKeys));
// => [Enabled, Disabled] (从每个参数中提取 'true' 和 'false' 属性值)

// 6. 嵌套数组形式 transformsArgs 示例 (确认 flatten 的效果)
const processNested = overArgs(fn, [s => s.toUpperCase()], ['length', o => o.value]);

console.log('\nExample 6 (Nested transformsArgs):');
console.log(processNested('hello', 'world', { value: 123 }));
// overArgs 扁平化 transformsArgs: [s=>s.toUpperCase(), 'length', o => o.value]
// 对第一个参数 'hello' 应用 s=>s.toUpperCase() -> 'HELLO'
// 对第二个参数 'world' 应用 'length' (property('length')) -> 5
// 对第三个参数 { value: 123 } 应用 o=>o.value -> 123
// 调用 fn('HELLO', 5, 123)
// => [HELLO, 5, 123]
```
