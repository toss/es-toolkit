# unset (Lodash 兼容性)

::: warning 请使用 `delete` 运算符

此 `unset` 函数由于复杂的路径解析和嵌套对象处理而运行缓慢。

请直接使用更快、更现代的 `delete` 运算符。

:::

删除对象指定路径的属性。

```typescript
const success = unset(object, path);
```

## 签名

```typescript
function unset(obj: unknown, path: PropertyKey | PropertyKey[]): boolean;
```

### 参数

- `obj` (`unknown`): 要修改的对象。
- `path` (`PropertyKey | PropertyKey[]`): 要删除的属性路径。

### 返回值

(`boolean`): 如果属性被删除则返回 true,否则返回 false。
字符串。

## 示例

```typescript
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // true
console.log(obj); // { a: { b: {} } }

const obj = { a: { b: { c: 42 } } };
unset(obj, ['a', 'b', 'c']); // true
console.log(obj); // { a: { b: {} } }
```
