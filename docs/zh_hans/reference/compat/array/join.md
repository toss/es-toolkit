# join (Lodash 兼容性)

::: warning 使用 `Array.prototype.join()`

由于需要处理 ArrayLike 对象、null/undefined 等,这个 `join` 函数运行缓慢。

请改用更快、更现代的 `Array.prototype.join()`。

:::

将数组中的元素连接成一个字符串。

## 签名

```typescript
function join<T>(array: T[], separator?: string): string;
```

### 参数

- `array` (`T[]`) - 要连接的数组。

::: info `array` 可以是 `ArrayLike<T>` 或 `null` 或 `undefined`

为了确保与 lodash 的完全兼容性,`join` 函数会按照以下方式处理 `array`:

- 如果 `array` 是 `ArrayLike<T>`,它会使用 `Array.from(...)` 将其转换为数组。
- 如果 `array` 是 `null` 或 `undefined`,它会被视为一个空数组。

:::

- `separator` (`string`) - 用于连接元素的分隔符,默认是逗号 (,)。

#### 返回值

(`string`): 返回一个包含所有通过指定分隔符连接的数组元素的字符串。

## 示例

```typescript
const arr = ['a', 'b', 'c'];
const result = join(arr, '~');
console.log(result); // Output: "a~b~c"
```
