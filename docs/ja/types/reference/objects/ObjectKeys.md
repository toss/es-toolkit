# ObjectKeys

`Object.keys`が返す形式のまま、オブジェクトのキーをユニオンとして作成します。`keyof`とは異なり、数値キーは文字列に変換され、シンボルキーは除外されます。オブジェクトのキーが常に文字列であるJavaScriptのランタイム動作と一致します。

```typescript
type Keys = ObjectKeys<T>;
```

## 使用法

### `ObjectKeys<T>`

`Object.keys`、`Object.entries`、`for...in`ループがランタイムで実際に生成する値と一致するキー型が必要なときに使用してください。TypeScriptがデフォルトで`string[]`に広げてしまう`Object.keys`の結果に型を付けるときに特に便利です。

```typescript
import type { ObjectKeys } from 'es-toolkit/types';

// keyofは数値キーを数値のまま保持しますが、ObjectKeysは文字列に変換します。
type Keys = ObjectKeys<{ a: number; 1: string }>; // 'a' | '1'
type KeyofKeys = keyof { a: number; 1: string }; // 'a' | 1

// Object.keysの結果に型を付けます。
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj) as Array<ObjectKeys<typeof obj>>; // Array<'a' | 'b'>

// インデックスシグネチャは文字列形式に解決されます。
type StringKeys = ObjectKeys<Record<string, number>>; // string
type NumberKeys = ObjectKeys<Record<number, string>>; // `${number}`

// Object.keysのランタイム動作と同様に、シンボルキーは除外されます。
declare const sym: unique symbol;
type NoSymbols = ObjectKeys<{ a: number; [sym]: string }>; // 'a'
```

#### 型パラメータ

- `T`: キーを読み取るオブジェクト型です。
