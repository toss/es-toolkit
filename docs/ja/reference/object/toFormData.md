# toFormData

オブジェクトを `FormData` インスタンスに変換します。この関数は、オブジェクト内の各キーと値のペアを再帰的に処理し、それを `FormData` インスタンスに追加します。ネストされたオブジェクトや配列、ファイル、さまざまなJavaScriptデータ型をサポートしており、複雑なデータ構造を処理するのに適しています。

- **ディープ変換**: ネストされたオブジェクトや配列を再帰的に `FormData` フォーマットに変換します。
- **ファイルサポート**: `File` と `Blob` オブジェクトを自動的に処理します。
- **型変換**: `boolean`、`BigInt`、`Date` などの一般的なJavaScriptデータ型を `FormData` に適した文字列表現に変換します。

## シグネチャ

```typescript
function toFormData(data: any, formData?: FormData, parentKey?: string): FormData;
```

### パラメータ

- `data` (`any`): `FormData` に変換されるオブジェクト。プリミティブ型、配列、オブジェクト、`File`、`Blob` などの一般的なデータ型をサポートします。
- `formData` (`FormData`): 既存の `FormData` インスタンスにデータを追加するためのオプション。指定しない場合、新しい `FormData` インスタンスが作成されます。
- `parentKey` (`string`): ネストされたオブジェクトや配列を処理するためのオプションのキー。再帰処理中に内部的に使用されます。

### 戻り値

(`FormData`): オブジェクトのキーと値のペアで埋められた `FormData` インスタンス。

## データ型のサポート

この関数は、さまざまなJavaScriptデータ型を処理します：

- `undefined`: スキップされ、`FormData` にエントリは作成されません。
- `null`: 空の文字列 (`''`) が追加されます。
- `boolean`: `'true'` または `'false'` に変換されます。
- `BigInt:` 文字列に変換されます。
- `Date`: ISO 文字列に変換されます。
- `File` / `Blob`: そのまま追加されます。
- `Array`: インデックスベースのキーで再帰的に処理されます。
- `Object`: ネストされたキーで再帰的に処理されます。

## 基本的な使用例

```typescript
const obj = { name: 'John', age: 30, preferences: { color: 'blue', food: 'pizza' } };
const formData = toFormData(obj);
// formDataには次が含まれます：
// "name" -> "John"
// "age" -> "30"
// "preferences[color]" -> "blue"
// "preferences[food]" -> "pizza"
```

### ファイルとBlobの処理

```typescript
const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
const obj = { name: 'John', profilePicture: file };
const formData = toFormData(obj);
// formDataには次が含まれます：
// "name" -> "John"
// "profilePicture" -> file
```

### BigIntと複雑なデータ型の処理

```typescript
const obj = { bigNumber: BigInt(12345678901234567890), createdAt: new Date() };
const formData = toFormData(obj);
// formDataには次が含まれます：
// "bigNumber" -> "12345678901234567890"
// "createdAt" -> "2024-10-17T12:00:00.000Z"
```

### ネストされたオブジェクトと配列

```typescript
const obj = {
  name: 'Alice',
  hobbies: ['reading', 'gaming'],
  address: {
    street: '123 Main St',
    city: 'Wonderland',
  },
};
const formData = toFormData(obj);
// formDataには次が含まれます：
// "name" -> "Alice"
// "hobbies[0]" -> "reading"
// "hobbies[1]" -> "gaming"
// "address[street]" -> "123 Main St"
// "address[city]" -> "Wonderland"
```
