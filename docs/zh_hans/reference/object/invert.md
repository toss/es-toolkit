# invert

创建一个通过交换给定对象的键和值而得到的新对象。

该函数接受一个对象，并创建一个新对象，其中原始对象的键变为新对象的值，原始对象的值变为新对象的键。

如果输入对象中存在重复的值，则使用最后出现的键作为新对象的键。

## 签名

```typescript
function invert<K extends PropertyKey, V extends PropertyKey>(obj: Record<K, V>): Record<V, K>;
```

### 参数

- `obj` (`Record<K, V>`): 要反转的对象。

### 返回值

(`Record<V, K>`): 一个键和值被反转的新对象。

## 示例

```typescript
const obj = { a: 1, b: 1, c: 2 };
const result = invert(obj);
// result 将会是 { 1: 'b', 2: 'c' }
```
