# 包体积

<FpBundleSizeChart />

由于 `es-toolkit/fp` 采用现代化实现，因此相比其他库拥有非常小的包体积。与 [remeda](https://remedajs.com/) 相比，它的包体积可小 1.5 倍，最多可小 10 倍以上。

从这个角度看，`es-toolkit/fp` 是减小包体积最有效的选择。有些工具函数的大小不到 100 字节。当然也支持 tree shaking。

## 包体积比较

<FpBundleSizeTable />

## 测量方法

使用 esbuild 0.28.0 打包如下具体的 JavaScript import 来测量。

```typescript
import { filter } from 'es-toolkit/fp';

console.log(filter);
```

```typescript
import { filter } from 'remeda';

console.log(filter);
```

准确的测量脚本见 `benchmarks/bundle-size/fp/`。
