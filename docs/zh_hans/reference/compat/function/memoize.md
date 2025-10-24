# memoize (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `memoize`
这个 `memoize` 函数由于 `resolver` 函数的 `null` 检查、`MapCache` 接口的复杂类型处理以及为了 Lodash 兼容性而产生的额外开销，导致运行缓慢。

建议使用更快、更现代的 `es-toolkit` 的 [memoize](../../function/memoize.md)。
:::

缓存函数结果，以在使用相同参数调用时提高性能。

```typescript
const memoizedFunc = memoize(func, resolver);
```

## 参考

### `memoize(func, resolver)`

当您想要缓存函数结果以在使用相同参数调用时重用之前的结果时，请使用 `memoize`。它对于昂贵的计算或 API 调用很有用。

```typescript
import { memoize } from 'es-toolkit/compat';

// 基本用法
function expensiveCalculation(n) {
  console.log('计算中...', n);
  return n * n;
}

const memoizedCalc = memoize(expensiveCalculation);

console.log(memoizedCalc(5)); // '计算中... 5', 25
console.log(memoizedCalc(5)); // 25 (缓存的结果，不计算)
console.log(memoizedCalc(10)); // '计算中... 10', 100

// 使用自定义解析器
function fetchUserData(userId, includeProfile) {
  console.log('获取用户数据...', userId, includeProfile);
  return { id: userId, profile: includeProfile ? '个人资料数据' : null };
}

// 生成考虑所有参数的缓存键
const memoizedFetch = memoize(fetchUserData, (userId, includeProfile) => {
  return `${userId}_${includeProfile}`;
});

memoizedFetch(1, true); // '获取用户数据... 1 true'
memoizedFetch(1, true); // 使用缓存的结果
memoizedFetch(1, false); // '获取用户数据... 1 false' (不同的缓存键)

// 访问和修改缓存
console.log(memoizedCalc.cache.get(5)); // 25
memoizedCalc.cache.set(7, 49); // 手动设置缓存
console.log(memoizedCalc(7)); // 49 (使用缓存值，不计算)
```

在大多数情况下使用基本哈希映射，但根据需要也可以使用自定义缓存实现。

#### 参数

- `func` (`Function`): 要记忆化的函数。
- `resolver` (`Function`, 可选): 确定缓存键的函数。如果未提供，使用第一个参数作为键。

#### 返回值

(`Function & { cache: MapCache }`): 返回记忆化的函数。返回的函数具有 `cache` 属性，可直接访问缓存。
