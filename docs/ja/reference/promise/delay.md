# delay

コードの実行を指定されたミリ秒だけ遅延させます。

この関数は、特定の時間後に解決されるPromiseを返します。async/await関数を使用する場合、関数の実行を一時的に停止させることができます。また、オプションとして遅延をキャンセルするためのAbortSignalをサポートしています。

## インターフェース

```typescript
function delay(ms: number, options?: DelayOptions): Promise<void>;
```

### パラメータ

- `ms` (`number`): コードの実行を遅延させるミリ秒。
- `options` (`DelayOptions`, オプション): オプションオブジェクト。
  - `signal` (`AbortSignal`, オプション): 遅延をキャンセルするためのオプションの`AbortSignal`。

### 戻り値

(`Promise<void>`): 指定された遅延時間後に解決されるPromise。

## 例

### 基本的な使用法

```typescript
async function foo() {
  console.log('開始');
  await delay(1000); // コードの実行を1秒間遅延
  console.log('終了');
}

foo();
```

### AbortSignalの使用法

```typescript
async function foo() {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => controller.abort(), 50); // 50ms後に遅延をキャンセル
  try {
    await delay(1000, { signal });
  } catch (error) {
    console.log(error); // 'The operation was aborted'をログ出力
  }
}
```
