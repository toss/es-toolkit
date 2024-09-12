# join

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

将数组中的元素连接成一个字符串。

## 签名

```typescript
function join<T>(array: T[], separator: string): string;
```

### 参数

- `array` (`T[]`) - 要连接的数组。
- `separator` (`string`) - 用于分隔元素的分隔符，默认是常用分隔符`,`。

### 返回值

(`string`): - 返回一个包含所有通过指定分隔符连接的数组元素的字符串。

## 示例

````typescript
```typescript
const arr = ["a","b","c"];
const result = join(arr, "~");
console.log(result); // Output: "a~b~c"
````

```

```
