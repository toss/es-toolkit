# now

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

1970年1月1日00:00:00 UTCから経過したミリ秒数を返します。

## インターフェース

```typescript
function now(): number;
```

### 戻り値

(`number`): 1970年1月1日00:00:00 UTC以降に経過したミリ秒。

## 例

```typescript
const currentTime = now();
console.log(currentTime); // Outputs the current time in milliseconds

const startTime = now();
// Some time-consuming operation
const endTime = now();
console.log(`Operation took ${endTime - startTime} milliseconds`);
```
