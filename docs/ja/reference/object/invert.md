# invert

オブジェクトのキーと値を入れ替えた新しいオブジェクトを生成します。

```typescript
const inverted = invert(obj);
```

## 使用法

### `invert(obj)`

オブジェクトのキーと値を入れ替えた新しいオブジェクトを作りたい時に`invert`を使用してください。元のオブジェクトのキーは新しいオブジェクトの値になり、元のオブジェクトの値は新しいオブジェクトのキーになります。重複した値がある場合、後に出現するキーが使用されます。

```typescript
import { invert } from 'es-toolkit/object';

// 基本的な使い方
const original = { a: 1, b: 2, c: 3 };
const inverted = invert(original);
console.log(inverted); // { 1: 'a', 2: 'b', 3: 'c' }

// 重複した値がある場合
const withDuplicates = { a: 1, b: 1, c: 2 };
const result = invert(withDuplicates);
console.log(result); // { 1: 'b', 2: 'c' } (後に出現する'b'がキー1の値として使用される)

// 文字列キーと数値の値
const grades = { alice: 85, bob: 92, charlie: 88 };
const invertedGrades = invert(grades);
console.log(invertedGrades); // { 85: 'alice', 92: 'bob', 88: 'charlie' }
```

様々な型のキーと値で使用できます。

```typescript
// 数値キーと文字列の値
const statusCodes = { 200: 'OK', 404: 'Not Found', 500: 'Internal Server Error' };
const invertedCodes = invert(statusCodes);
console.log(invertedCodes);
// { 'OK': '200', 'Not Found': '404', 'Internal Server Error': '500' }

// 逆方向の検索が必要な場合に便利です
const userRoles = { admin: 'administrator', user: 'regular_user', guest: 'visitor' };
const roleToKey = invert(userRoles);
console.log(roleToKey);
// { 'administrator': 'admin', 'regular_user': 'user', 'visitor': 'guest' }

// これで値でキーを見つけることができます
function findRoleKey(roleName: string) {
  return roleToKey[roleName];
}
console.log(findRoleKey('administrator')); // 'admin'
```

列挙型(Enum)や定数オブジェクトと一緒に使用すると便利です。

```typescript
// 色コードマッピング
const colorCodes = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
};

const codeToColor = invert(colorCodes);
console.log(codeToColor);
// { '#FF0000': 'red', '#00FF00': 'green', '#0000FF': 'blue' }

// これで色コードで色名を見つけることができます
function getColorName(code: string) {
  return codeToColor[code] || 'unknown';
}
console.log(getColorName('#FF0000')); // 'red'
```

#### パラメータ

- `obj` (`Record<K, V>`): キーと値を入れ替えるオブジェクトです。キーと値の両方が文字列、数値、またはシンボルである必要があります。

#### 戻り値

(`Record<V, K>`): 元のオブジェクトのキーと値が入れ替わった新しいオブジェクトです。
