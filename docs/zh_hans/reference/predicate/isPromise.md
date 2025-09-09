# isPromise

检查给定值是否为 `Promise`。

此函数测试提供的值是否为 `Promise` 的实例。
如果值是 `Promise`，则返回 `true`，否则返回 `false`。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `Promise`。

## 签名

```typescript
function isPromise(value: unknown): value is Promise<any>;
```

### 参数

- `value` (`unknown`): 检查是否为`Promise`的值。

### 返回值

(`value is Promise<any>`): 如果`value`是`Promise`，则返回`true`，否则返回`false`。

## 示例

```typescript
const value1 = new Promise(resolve => resolve());
const value2 = {};
const value3 = 123;

console.log(isPromise(value1)); // true
console.log(isPromise(value2)); // false
console.log(isPromise(value3)); // false
```
