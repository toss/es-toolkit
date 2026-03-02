# set (Lodash 互換性)

::: warning 直接代入を使用してください

この `set` 関数は内部的に `updateWith` 関数を呼び出し、複雑なパス処理とオブジェクト作成ロジックにより遅く動作します。

代わりに、より高速で現代的な直接代入や分割代入を使用してください。

:::

オブジェクトの指定されたパスに値を設定します。

```typescript
const result = set(obj, path, value);
```

## 使用法

### `set(object, path, value)`

オブジェクトの特定のパスに値を設定したい場合は、`set` を使用してください。パスの一部が存在しない場合は自動的に作成されます。ネストされたオブジェクトや配列を扱う際に便利です。

```typescript
import { set } from 'es-toolkit/compat';

// 基本的な使い方
const obj = { a: { b: { c: 3 } } };
set(obj, 'a.b.c', 4);
console.log(obj.a.b.c); // 4

// 配列に値を設定
const arr = [1, 2, 3];
set(arr, '1', 4);
console.log(arr[1]); // 4

// 存在しないパスを作成
const empty = {};
set(empty, 'user.profile.name', 'John');
console.log(empty);
// 結果: { user: { profile: { name: 'John' } } }

// 配列パスを使用
const data = {};
set(data, ['nested', 'array', 0], 'first item');
console.log(data);
// 結果: { nested: { array: ['first item'] } }

// 配列インデックスを自動作成
const list = {};
set(list, 'items[0]', 'first');
set(list, 'items[2]', 'third');
console.log(list);
// 結果: { items: ['first', undefined, 'third'] }

// ネストされたオブジェクトと配列の混合
const complex = {};
set(complex, 'users[0].profile.settings.theme', 'dark');
console.log(complex);
// 結果: { users: [{ profile: { settings: { theme: 'dark' } } }] }

// 数値キーの処理
const numeric = {};
set(numeric, 123, 'number key');
console.log(numeric[123]); // 'number key'

// 既存の値を上書き
const existing = { a: { b: 'old' } };
set(existing, 'a.b', 'new');
console.log(existing.a.b); // 'new'
```

元のオブジェクトが直接変更されて返されます。

```typescript
import { set } from 'es-toolkit/compat';

const original = { x: 1 };
const result = set(original, 'y', 2);

console.log(original === result); // true
console.log(original); // { x: 1, y: 2 }
```

#### パラメータ

- `object` (`T`): 値を設定するオブジェクト。
- `path` (`PropertyPath`): 値を設定するプロパティのパス。文字列、配列、またはキーの配列にすることができます。
- `value` (`any`): 設定する値。

#### 戻り値

(`T`): 変更されたオブジェクトを返します(元のオブジェクトと同じ)。
