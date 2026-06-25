# バンドルサイズ

<FpBundleSizeChart />

`es-toolkit/fp` はモダンな実装を採用しているため、他のライブラリに比べて非常に小さなバンドルサイズです。[remeda](https://remedajs.com/) と比較すると、1.5 倍から最大 10 倍以上小さなバンドルサイズになります。

この点で、`es-toolkit/fp` はバンドルサイズを減らすうえで最も効率的な選択肢です。一部のユーティリティ関数は 100 バイト未満です。もちろん tree shaking もサポートしています。

## バンドルサイズ比較

<FpBundleSizeTable />

## 測定方法

esbuild 0.28.0 で、次のような具体的な JavaScript import をバンドルして測定しています。

```typescript
import { filter } from 'es-toolkit/fp';

console.log(filter);
```

```typescript
import { filter } from 'remeda';

console.log(filter);
```

正確な測定スクリプトは `benchmarks/bundle-size/fp/` を参照してください。
