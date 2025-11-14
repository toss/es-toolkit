# stubTrue (Lodash 互換性)

::: warning `true`リテラルを使用してください

この`stubTrue`関数は不要な関数呼び出しにより動作が遅くなります。

代わりにより高速で現代的な`true`リテラルを使用してください。

:::

常に`true`値を返します。

```typescript
const result = stubTrue();
```

## 使用法

### `stubTrue()`

常に`true`値が必要なコールバック関数やデフォルト値として使用する時に`stubTrue`を使用してください。配列メソッドのフィルタリングや条件分岐ロジックで一貫した`true`値を提供する際に役立ちます。

```typescript
import { stubTrue } from 'es-toolkit/compat';

// 配列ですべての要素を保持するフィルター
const items = [1, 2, 3, 4, 5];
const allItems = items.filter(stubTrue);
console.log(allItems); // [1, 2, 3, 4, 5]
```

条件付き設定でデフォルト値としても使用できます。

```typescript
import { stubTrue } from 'es-toolkit/compat';

// デフォルトで有効化されたオプション
const defaultOptions = {
  enableFeatureA: stubTrue(),
  enableFeatureB: stubTrue(),
  enableFeatureC: stubTrue(),
};

console.log(defaultOptions); // { enableFeatureA: true, enableFeatureB: true, enableFeatureC: true }
```

#### パラメータ

パラメータはありません。

#### 戻り値

(`boolean`): 常に`true`を返します。
