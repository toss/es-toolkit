# stubObject (Lodash 互換性)

::: warning `{}`を直接使用してください

この `stubObject` 関数は単純に空のオブジェクトを返すラッパー関数で不要な抽象化です。

代わりに、より高速で直接的な`{}`を使用してください。

:::

常に新しい空のオブジェクトを返します。

```typescript
const emptyObject = stubObject();
```

## 参照

### `stubObject()`

常に新しい空のオブジェクトを返す関数です。デフォルト値として空のオブジェクトが必要な時や関数型プログラミングで一貫した戻り値が必要な時に使用します。

```typescript
import { stubObject } from 'es-toolkit/compat';

// 空のオブジェクトを返す
const emptyObject = stubObject();
console.log(emptyObject); // => {}

// デフォルト値として使用する
function processData(data = stubObject()) {
  return { ...data, processed: true };
}

console.log(processData()); // => { processed: true }
console.log(processData({ name: 'John' })); // => { name: 'John', processed: true }

// 関数型プログラミングで使用する
const createEmpty = () => stubObject();
const obj = createEmpty();
obj.newProperty = 'value'; // 新しいオブジェクトなので安全
```

毎回新しいオブジェクトインスタンスを返します。

```typescript
import { stubObject } from 'es-toolkit/compat';

const obj1 = stubObject();
const obj2 = stubObject();

console.log(obj1 === obj2); // => false (異なるインスタンス)
console.log(typeof obj1); // => 'object'
console.log(Object.keys(obj1).length); // => 0
```

#### パラメータ

パラメータはありません。

#### 戻り値

(`any`): 新しい空のオブジェクトを返します。
