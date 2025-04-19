# isWindow

此函数检查给定的元素是否为 `Window` 对象。
如果元素是 `Window` 对象，则返回 `true`，否则返回 `false`。

此函数通常用作 TypeScript 的类型谓词，可以将参数的类型缩小为 `Window` 类型。

## 签名

```typescript
function isWindow(element: unknown): element is Window;
```

### 参数

- `element` (`unknown`): 需要检查是否为 `Window` 对象的元素。

### 返回值

(`element is Window`): 如果元素是 `Window` 对象，则返回 `true`，否则返回 `false`。

## 示例

```typescript
console.log(isWindow(window)); // true
console.log(isWindow(document)); // false
console.log(isWindow({})); // false
```
