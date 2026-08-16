# ToCamelCaseKeys

オブジェクト型のすべてのキーを再帰的にキャメルケース(camelCase)に変換します。[`toCamelCaseKeys`](../../reference/object/toCamelCaseKeys.md) 関数の戻り値の型です。

```typescript
type Converted = ToCamelCaseKeys<T>;
```

## 使用法

### `ToCamelCaseKeys<T>`

キーがキャメルケースに変換されたデータの型が必要なときに `ToCamelCaseKeys` を使用してください。たとえば、API レスポンスを [`toCamelCaseKeys`](../../reference/object/toCamelCaseKeys.md) で変換した結果の型を表現できます。ネストされたオブジェクトと配列内のオブジェクトのキーも再帰的に変換されます。`Date` や `Map` などの組み込みオブジェクトとプリミティブ値はそのまま保持されます。

```typescript
import type { ToCamelCaseKeys } from 'es-toolkit/types';

type ApiUser = {
  user_id: number;
  first_name: string;
  user_address: { zip_code: string };
};

type User = ToCamelCaseKeys<ApiUser>;
// => { userId: number; firstName: string; userAddress: { zipCode: string } }
```

#### 型パラメータ

- `T`: キーを変換する型です。
