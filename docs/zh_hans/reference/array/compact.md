# compact

从数组中删除假值（`false`、 `null`、 `0`、 `0n`, `''`、 `undefined`、 `NaN`）。

## 签名

```typescript
function compact<T>(arr: T[]): Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>;
```

### 参数

- `arr` (`T[]`): 要移除假值的输入数组。

### 返回值

(`Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>`) 移除所有假值后的新数组。

## 示例

```typescript
compact([0, 0n, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// 返回: [1, 2, 3, 4, 5]
```
