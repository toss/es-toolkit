# extend (Lodash 互換性)

::: warning `Object.assign()` を使用してください

この `extend` 関数は、プロトタイプチェーンから継承されたプロパティを処理する複雑なロジックにより、動作が遅くなります。

代わりに、より高速で現代的な `Object.assign()` を使用してください。

:::

オブジェクトの固有プロパティと継承されたプロパティを別のオブジェクトにコピーします。

```typescript
const result = extend(object, source);
```

## 使用法

### `extend(object, ...sources)`

あるオブジェクトから別のオブジェクトにプロパティをコピーするには、`extend` を使用してください。`Object.assign()` と似ていますが、継承されたプロパティもコピーします。この関数は `assignIn` のエイリアスです。

```typescript
import { extend } from 'es-toolkit/compat';

// 基本的なプロパティのコピー
const target = { a: 1 };
extend(target, { b: 2 }, { c: 3 });
// 戻り値: { a: 1, b: 2, c: 3 }

// 継承されたプロパティもコピーします
function Parent() {
  this.a = 1;
}
Parent.prototype.b = 2;

const source = new Parent();
extend({}, source);
// 戻り値: { a: 1, b: 2 }
```

同じプロパティが存在する場合、後のソースオブジェクトの値で上書きされます。

```typescript
import { extend } from 'es-toolkit/compat';

extend({ a: 1, b: 2 }, { b: 3 }, { c: 4 });
// 戻り値: { a: 1, b: 3, c: 4 }
```

#### パラメータ

- `object` (`any`): プロパティをコピーされる対象オブジェクトです。
- `...sources` (`any[]`): プロパティを提供するソースオブジェクトです。

#### 戻り値

(`any`): プロパティがコピーされたオブジェクトを返します。最初の引数である `object` が変更されます。
