# now (Lodash 互換性)

::: warning `Date.now()`を使用してください

この `now` 関数は単純に`Date.now()`を呼び出すラッパー関数で不要な抽象化です。

代わりに、より高速で直接的な`Date.now()`を使用してください。

:::

現在時刻をミリ秒単位で返します。

```typescript
const currentTime = now();
```

## 参照

### `now()`

1970年1月1日00:00:00 UTCから経過したミリ秒数を返します。時間測定やタイムスタンプ生成に便利です。

```typescript
import { now } from 'es-toolkit/compat';

// 現在時刻を取得する
const currentTime = now();
console.log(currentTime); // => 1703925600000 (例)

// 実行時間を測定する
const startTime = now();
// 時間がかかる作業
const endTime = now();
console.log(`作業時間: ${endTime - startTime}ms`);

// タイムスタンプとして使用する
const timestamp = now();
const logMessage = `[${timestamp}] 作業完了`;
```

`Date.now()`と同じ結果を返します。

```typescript
import { now } from 'es-toolkit/compat';

console.log(now() === Date.now()); // => true (同じ時点で呼び出された場合)
```

#### パラメータ

パラメータはありません。

#### 戻り値

(`number`): 1970年1月1日00:00:00 UTCから現在までのミリ秒数を返します。
