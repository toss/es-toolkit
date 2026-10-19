# UnknownRecord

キーも値も分からないオブジェクトです。

```typescript
type Data = UnknownRecord;
```

## 使用法

### `UnknownRecord`

`{}` の代わりに使います。`{}` は名前に反して、`null` と `undefined` 以外の数値や文字列まで受け取ってしまいます。値が `unknown` なので、読み取る前に確認が必要です。

```typescript
import type { UnknownRecord } from 'es-toolkit/types';

function log(data: UnknownRecord) {
  if (typeof data.id === 'string') {
    console.log(data.id);
  }
}

log({ id: '1' }); // 通ります

// log(42); // エラーです。`{}` なら通ってしまいます。
```

#### 注意点

インデックスシグネチャを持つ型だけが代入できます。`interface` はキーを 1 つずつ宣言するため拒否されます。

```typescript
interface Payload {
  id: string;
}

type PayloadAlias = { id: string };

declare const payload: Payload;
declare const alias: PayloadAlias;

const a: UnknownRecord = alias; // 通ります
// const b: UnknownRecord = payload; // 形は同じですが、インデックスシグネチャがないのでエラーになります。
```

`interface` が渡ってくる可能性のある場所では `object` で受け取るか、渡す側で `{ ...payload }` のように展開してください。
