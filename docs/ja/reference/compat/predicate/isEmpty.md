# isEmpty (Lodash互換性)

指定された値が空かどうかを確認します。

```typescript
const result = isEmpty(value);
```

## 参照

### `isEmpty(value)`

様々な型の値が空かどうかを確認したい場合は`isEmpty`を使用してください。文字列、配列、オブジェクト、Map、Setなどをすべて処理できます。

```typescript
import { isEmpty } from 'es-toolkit/compat';

// 文字列の確認
isEmpty(''); // true
isEmpty('hello'); // false

// 配列の確認
isEmpty([]); // true
isEmpty([1, 2, 3]); // false

// オブジェクトの確認
isEmpty({}); // true
isEmpty({ a: 1 }); // false

// MapとSetの確認
isEmpty(new Map()); // true
isEmpty(new Set()); // true
isEmpty(new Map([['key', 'value']])); // false
isEmpty(new Set([1, 2, 3])); // false

// nullとundefined
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(); // true

// 配列のようなオブジェクト
isEmpty({ 0: 'a', length: 1 }); // false
isEmpty({ length: 0 }); // false
```

プリミティブ値はすべて空の値として処理されます:

```typescript
import { isEmpty } from 'es-toolkit/compat';

isEmpty(0); // true
isEmpty(false); // true
isEmpty(123); // true
isEmpty('text'); // false (文字列は長さで判定)
```

#### パラメータ

- `value` (`unknown`, 任意): 確認する値です。

#### 戻り値

(`boolean`): 値が空の場合は`true`、そうでない場合は`false`を返します。
