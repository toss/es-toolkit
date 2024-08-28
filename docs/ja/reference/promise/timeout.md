# timeout

指定した時間後に `TimeoutError` エラーと共に reject される `Promise` を返します。

## インターフェース

```typescript
function timeout(ms: number): Promise<never>;
```

### パラメータ

- `ms` (`number`): `TimeoutError` エラーと共に reject されるまでのミリ秒。

### 戻り値

(`Promise<never>`): `TimeoutError` で reject される Promise。

## 例

### 基本的な使用法

```typescript
try {
  await timeout(1000); // 1秒後に TimeoutError エラーが発生
} catch (error) {
  console.error(error); // 'The operation was timed out' がログに出力される
}
```
