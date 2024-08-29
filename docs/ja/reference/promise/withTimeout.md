# withTimeout

指定した時間よりも遅く応答した場合、`TimeoutError`エラーとして処理します。

この関数は、特定の時間を過ぎてもvalueの応答が遅い場合、TimeoutErrorでrejectされるPromiseを返します。async/await関数を使用する場合、関数の最大実行時間を設定できます。

## インターフェース

```typescript
function withTimeout<T>(run: () => Promise<T>, ms: number): Promise<T>;
```

### パラメータ

- `run` (`() => Promise<T>`): 実行する非同期関数。
- `ms` (`number`): Promiseの最大実行時間を指定するミリ秒。

### 戻り値

(`Promise<T>`): 与えられた非同期関数が返す`Promise`。

## 例

### 基本的な使用法

```typescript
try {
  await withTimeout(() => new Promise(() => {}), 1000); // コードの最大時間を1秒に設定
} catch (error) {
  console.error(error); // 'The operation was timed out'がログに記録される
}
```
