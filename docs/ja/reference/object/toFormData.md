# toFormData

オブジェクトを `FormData` インスタンスに変換します。この関数は、オブジェクト内の各キーと値のペアを再帰的に処理し、それを `FormData` インスタンスに追加します。ネストされたオブジェクトや配列、ファイル、およびさまざまなJavaScriptデータ型をサポートしており、複雑なデータ構造に対応できるように構成オプションでのカスタマイズが可能です。

- **ディープ変換**: ネストされたオブジェクトや配列を再帰的に `FormData` フォーマットに変換します。
- **ファイルサポート**: `File` および `Blob` オブジェクトを自動的に処理します。
- **型変換**: `boolean`、`BigInt`、`Date` などの一般的なJavaScriptデータ型を `FormData` に適した文字列表現に変換します。
- **構成オプション**: 配列、boolean、null値、ネストされたオブジェクトの処理方法をカスタマイズするためのオプションを提供します。

## シグネチャ

```typescript
function toFormData({
  data: Record<string, any>,
  formData = new FormData(),
  parentKey?: string,
  config = formDataOptions
}): FormData;
```

### パラメータ

- `data` (`Record<string, any>`): `FormData` に変換されるオブジェクト。プリミティブ型、配列、オブジェクト、`File`、`Blob` などの一般的なデータ型をサポートします。
- `formData` (`FormData`): データを追加するための既存の `FormData` インスタンスです。指定しない場合、新しい `FormData` インスタンスが作成されます。
- `parentKey` (`string`): ネストされたオブジェクトや配列を処理するためのオプションのキー。再帰処理中に内部的に使用されます。
- `config` (`object`): `FormData` 変換をカスタマイズするための構成オブジェクトです。

### 構成オプション

- `allowEmptyArrays` (`boolean`): `true` の場合、空の配列が空文字列として `FormData` に追加されます。デフォルトは `false` です。
- `convertBooleansToIntegers` (`boolean`): `true` の場合、boolean 値 (`true`/`false`) が `'1'` および `'0'` に変換されます。デフォルトは `false` です。
- `ignoreNullValues` (`boolean`): `true` の場合、`null` 値が `FormData` から省略されます。デフォルトは `false` です。
- `noArrayNotationForFiles` (`boolean`): `true` の場合、ファイルの配列は `[]` 表記なしで `FormData` に追加されます。デフォルトは `false` です。
- `noArrayNotationForNonFiles` (`boolean`): `true` の場合、ファイル以外の配列が `[]` 表記なしで `FormData` に追加されます。デフォルトは `false` です。
- `useDotNotationForObjects` (`boolean`): `true` の場合、ネストされたオブジェクトプロパティは、ブラケット表記（例: `parent[child]`）ではなくドット表記（例: `parent.child`）で表されます。デフォルトは `false` です。

### 戻り値

(`FormData`): オブジェクトのキーと値のペアで埋められた `FormData` インスタンスです。

### データ型のサポート

この関数は、さまざまなJavaScriptデータ型を処理します：

- `undefined`: スキップされ、`FormData` にエントリは作成されません。
- `null`: 空の文字列 (`''`) が追加されるか、`ignoreNullValues` に基づいて無視されます。
- `boolean`: `'true'` または `'false'` に変換されます。または、`convertBooleansToIntegers` が `true` の場合は `'1'` または `'0'` に変換されます。
- `BigInt`: 文字列に変換されます。
- `Date`: ISO 文字列に変換されます。
- `File` / `Blob`: そのまま追加されます。
- `Array`: 構成に基づき、インデックスまたは省略された `[]` 表記で再帰的に処理されます。
- `Object`: 構成に基づき、ドット表記またはブラケット表記のネストされたキーで再帰的に処理されます。

## 使用例

### 基本的な使用例と構成

```typescript
const obj = { name: 'John', age: 30, preferences: { color: 'blue', food: 'pizza' } };
const formData = toFormData({ data: obj, config: { useDotNotationForObjects: true } });
// formDataには次が含まれます：
// "name" -> "John"
// "age" -> "30"
// "preferences.color" -> "blue"
// "preferences.food" -> "pizza"
```

### ファイルと空の配列の処理

```typescript
const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
const obj = { name: 'John', profilePicture: file, tags: [] };
const formData = toFormData({ data: obj, config: { allowEmptyArrays: true } });
// formDataには次が含まれます：
// "name" -> "John"
// "profilePicture" -> file
// "tags" -> ""
```

### boolean の変換と null 値の無視

```typescript
const obj = { isActive: true, age: null };
const formData = toFormData({ data: obj, config: { convertBooleansToIntegers: true, ignoreNullValues: true } });
// formDataには次が含まれます：
// "isActive" -> "1"
// (null の "age" エントリは省略されます)
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
const formData = toFormData({ data: obj, config: { noArrayNotationForNonFiles: true } });
// formDataには次が含まれます：
// "name" -> "Alice"
// "hobbies" -> ["reading", "gaming"] // 非ファイル配列に配列表記がありません
// "address[street]" -> "123 Main St"
// "address[city]" -> "Wonderland"
```
