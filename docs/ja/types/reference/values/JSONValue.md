# JSONValue

`JSON.parse` が生成しうるすべての値です。

```typescript
type Value = JSONValue;
```

## 使用法

### `JSONValue`

API レスポンスや設定ファイルなど、JSON を経由してやり取りするデータに使います。関数、`Date`、`undefined`、クラスのインスタンスは JSON を往復すると失われるため除外されます。

```typescript
import type { JSONValue } from 'es-toolkit/types';

declare function parse(text: string): JSONValue;

const value = parse('{"a":[1,null]}');
if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
  const a = value.a; // JSONValue
}

const ok: JSONValue = { name: 'toss', tags: ['a', 'b'], count: null };

// const bad: JSONValue = { at: new Date() }; // エラーです。Date は JSON ではありません。

// JSON オブジェクトだけを受け取りたいときは Record を使います。
declare function send(body: Record<string, JSONValue>): void;
```

#### 注意点

`NaN` と `Infinity` は `number` なので型チェックは通りますが、`JSON.stringify` を通すと `null` になります。型では防げないので、値を作るときに気をつけてください。
