# isSemver

检查给定的字符串是否是有效的语义版本，符合 [Semantic Versioning 2.0.0](https://semver.org/) 规范。

## 签名

```typescript
function isSemver(value: unknown): boolean;
```

### 参数

- `value` (`unknown`): 要测试的值是否是有效的语义版本。

### 返回值

(`boolean`): 如果该值是有效的语义版本，则为 `true`，否则为 `false`。

## 示例

```typescript
const value1 = '1.0.0';
const value2 = '1.0.0-alpha+001';
const value3 = '1.0';

console.log(isSemver(value1)); // true
console.log(isSemver(value2)); // true
console.log(isSemver(value3)); // false
```
