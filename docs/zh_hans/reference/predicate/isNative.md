# isNative

检查`value`是否为原生函数。

原生函数是指JavaScript引擎本身实现的函数。例如，`Array.prototype.map`、`Object.keys`、`Function.prototype.bind`等。

## 接口

```typescript
function isNative(value: unknown): boolean;
```

### 参数

- `value` (`unknown`): 要检查的值

### 返回值

(`boolean`): 如果`value`是原生函数则返回`true`，否则返回`false`。

## 示例

```typescript
import { isNative } from 'es-toolkit/predicate';

console.log(isNative(Array.prototype.push)); // => true
console.log(isNative(function () {})); // => false
console.log(isNative(Math.max)); // => true
console.log(isNative(() => {})); // => false
```
