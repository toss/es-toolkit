# ToSnakeCaseKeys

オブジェクト型のすべてのキーを再帰的に snake_case に変換します。[`toSnakeCaseKeys`](../../reference/object/toSnakeCaseKeys.md) 関数の戻り値の型です。

```typescript
type Converted = ToSnakeCaseKeys<T>;
```

## 使用法

### `ToSnakeCaseKeys<T>`

キーが snake_case に変換されたデータの型が必要なときに `ToSnakeCaseKeys` を使います。たとえば、リクエストボディを [`toSnakeCaseKeys`](../../reference/object/toSnakeCaseKeys.md) に通した結果の型を表現できます。ネストしたオブジェクトや配列内のオブジェクトのキーも再帰的に変換されます。`Date` や `Map` などの組み込みオブジェクトとプリミティブ値はそのまま保持されます。

```typescript
import type { ToSnakeCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type ApiUser = ToSnakeCaseKeys<User>;
// => { user_id: number; first_name: string; user_address: { zip_code: string } }
```

#### 型パラメータ

- `T`: キーを変換する型です。
