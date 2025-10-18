# isPromise

与えられた値が `Promise` インスタンスかどうかを確認します。

```typescript
const result = isPromise(value);
```

## 参照

### `isPromise(value)`

値が `Promise` インスタンスかどうかを確認したい場合は `isPromise` を使用してください。非同期コードで `Promise` オブジェクトを他の値と区別する必要がある場合や、条件付きで `await` を使用する必要がある場合に便利です。

```typescript
import { isPromise } from 'es-toolkit/predicate';

// Promise インスタンス
const promise1 = new Promise(resolve => resolve('done'));
const promise2 = Promise.resolve(42);
const promise3 = Promise.reject(new Error('failed'));

console.log(isPromise(promise1)); // true
console.log(isPromise(promise2)); // true
console.log(isPromise(promise3)); // true

// Promise でない値
console.log(isPromise({})); // false
console.log(isPromise('hello')); // false
console.log(isPromise(42)); // false
console.log(isPromise(null)); // false
console.log(isPromise(undefined)); // false
```

非同期関数で条件に応じてロジックを実行する際に便利です。

```typescript
// 値が Promise かどうかを確認して適切に処理
async function processValue(input: unknown) {
  if (isPromise(input)) {
    // TypeScript が input を Promise<any> として推論
    const result = await input;
    console.log('Promise の結果:', result);
    return result;
  }

  // Promise でない値はそのまま返す
  console.log('通常の値:', input);
  return input;
}

// API レスポンスの処理
function handleApiCall(response: unknown) {
  if (isPromise(response)) {
    return response.then(data => ({ success: true, data })).catch(error => ({ success: false, error: error.message }));
  }

  // すでに解決された値
  return { success: true, data: response };
}

// ユーティリティ関数での活用
function toPromise<T>(value: T | Promise<T>): Promise<T> {
  if (isPromise(value)) {
    return value;
  }

  return Promise.resolve(value);
}
```

`Promise` のようなオブジェクトと実際の `Promise` を区別できます。

```typescript
// thenable オブジェクトは Promise ではない
const thenable = {
  then: (resolve: Function) => resolve('not a promise'),
};

console.log(isPromise(thenable)); // false

// async 関数の結果は Promise
async function asyncFunction() {
  return 'async result';
}

console.log(isPromise(asyncFunction())); // true

// 通常の関数は Promise ではない
function normalFunction() {
  return 'normal result';
}

console.log(isPromise(normalFunction())); // false
```

エラー処理にも使用できます。

```typescript
function safeExecute(fn: () => any) {
  try {
    const result = fn();

    if (isPromise(result)) {
      return result.catch(error => {
        console.error('非同期関数の実行中にエラー:', error);
        return null;
      });
    }

    return result;
  } catch (error) {
    console.error('同期関数の実行中にエラー:', error);
    return null;
  }
}

// タイムアウト処理
function withTimeout<T>(valueOrPromise: T | Promise<T>, timeoutMs: number) {
  if (!isPromise(valueOrPromise)) {
    return valueOrPromise;
  }

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeoutMs);
  });

  return Promise.race([valueOrPromise, timeoutPromise]);
}
```

#### パラメータ

- `value` (`unknown`): Promise インスタンスかどうかを確認する値です。

#### 戻り値

(`value is Promise<any>`): 値が Promise インスタンスの場合は `true`、それ以外の場合は `false` を返します。
