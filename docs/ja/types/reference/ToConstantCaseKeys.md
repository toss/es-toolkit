# ToConstantCaseKeys

オブジェクト型のすべてのキーを再帰的に定数ケース(CONSTANT_CASE)に変換します。[`toConstantCaseKeys`](../../reference/object/toConstantCaseKeys.md) 関数の戻り値の型です。

```typescript
type Converted = ToConstantCaseKeys<T>;
```

## 使用法

### `ToConstantCaseKeys<T>`

キーが定数ケースに変換されたデータの型が必要なときに `ToConstantCaseKeys` を使用してください。たとえば、オブジェクトを [`toConstantCaseKeys`](../../reference/object/toConstantCaseKeys.md) で変換した結果の型を表現できます。ネストされたオブジェクトと配列内のオブジェクトのキーも再帰的に変換されます。`Date` や `Map` などの組み込みオブジェクトとプリミティブ値はそのまま保持されます。

```typescript
import type { ToConstantCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type ConstantUser = ToConstantCaseKeys<User>;
// => { USER_ID: number; FIRST_NAME: string; USER_ADDRESS: { ZIP_CODE: string } }
```

#### 型パラメータ

- `T`: キーを変換する型です。
