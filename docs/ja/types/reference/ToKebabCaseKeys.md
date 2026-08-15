# ToKebabCaseKeys

オブジェクト型のすべてのキーを再帰的に kebab-case に変換します。[`toKebabCaseKeys`](../../reference/object/toKebabCaseKeys.md) 関数の戻り値の型です。

```typescript
type Converted = ToKebabCaseKeys<T>;
```

## 使用法

### `ToKebabCaseKeys<T>`

キーが kebab-case に変換されたデータの型が必要なときに `ToKebabCaseKeys` を使います。たとえば、ペイロードを [`toKebabCaseKeys`](../../reference/object/toKebabCaseKeys.md) に通した結果の型を表現できます。ネストしたオブジェクトや配列内のオブジェクトのキーも再帰的に変換されます。`Date` や `Map` などの組み込みオブジェクトとプリミティブ値はそのまま保持されます。

```typescript
import type { ToKebabCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type KebabUser = ToKebabCaseKeys<User>;
// => { 'user-id': number; 'first-name': string; 'user-address': { 'zip-code': string } }
```

#### 型パラメータ

- `T`: キーを変換する型です。
