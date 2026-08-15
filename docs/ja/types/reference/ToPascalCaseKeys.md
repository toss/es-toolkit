# ToPascalCaseKeys

オブジェクト型のすべてのキーを再帰的に PascalCase に変換します。[`toPascalCaseKeys`](../../reference/object/toPascalCaseKeys.md) 関数の戻り値の型です。

```typescript
type Converted = ToPascalCaseKeys<T>;
```

## 使用法

### `ToPascalCaseKeys<T>`

キーが PascalCase に変換されたデータの型が必要なときに `ToPascalCaseKeys` を使います。たとえば、ペイロードを [`toPascalCaseKeys`](../../reference/object/toPascalCaseKeys.md) に通した結果の型を表現できます。ネストしたオブジェクトや配列内のオブジェクトのキーも再帰的に変換されます。`Date` や `Map` などの組み込みオブジェクトとプリミティブ値はそのまま保持されます。

```typescript
import type { ToPascalCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type PascalUser = ToPascalCaseKeys<User>;
// => { UserId: number; FirstName: string; UserAddress: { ZipCode: string } }
```

#### 型パラメータ

- `T`: キーを変換する型です。
