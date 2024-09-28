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
async function fetchData() {
  const response = await fetch('https://example.com/data');
  return response.json();
}

try {
  const data = await withTimeout(fetchData, 1000);
  console.log(data); // `fetchData` が1秒以内に解決されれば、取得したデータをログに出力します。
} catch (error) {
  console.error(error); // `fetchData` が1秒以内に解決されなければ、'TimeoutError' をログに出力します。
}
```
