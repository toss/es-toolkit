# isMatchWith

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

这个方法类似于 `isMatch`，但它接受 `customizer` 来比较值。如果 `customizer` 返回 `undefined`，则由该方法处理比较。`customizer` 被调用时传入五个参数：(objValue, srcValue, index|key, object, source)。

## 签名

```typescript
function isMatchWith(
  target: unknown,
  source: unknown,
  customizer?: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => unknown
): boolean;
```

### 参数

- `target` (`unknown`): 要检查的对象。
- `source` (`unknown`): 要匹配的属性值对象。
- `customizer` (`Function`, 可选): 自定义比较的函数。

### 返回值

(`boolean`): 如果对象匹配则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { isMatchWith } from 'es-toolkit/compat';

function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}

function customizer(objValue, srcValue) {
  if (isGreeting(objValue) && isGreeting(srcValue)) {
    return true;
  }
}

const object = { greeting: 'hello' };
const source = { greeting: 'hi' };

isMatchWith(object, source, customizer);
// => true
```
