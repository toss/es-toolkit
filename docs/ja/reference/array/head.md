# head

配列の最初の要素を返します。

この関数は、配列を入力として受け取り、配列の最初の要素を返します。配列が空の場合、関数は`undefined`を返します。

## インターフェース

```typescript
function head<T>(arr: [T, ...T[]]): T;
function head<T>(arr: T[]): T | undefined;
```

### パラメータ

- `arr` (`T[]`): 最初の要素を取得する配列です。

### 戻り値

(`T | undefined`): 配列の最初の要素、配列が空の場合`undefined`を返します。

## 例

```typescript
const arr1 = [1, 2, 3];
const firstElement1 = head(arr1);
// firstElement1は1です。

const arr2: string[] = [];
const firstElement2 = head(arr2);
// firstElement2はundefinedです。

const arr3 = ['a', 'b', 'c'];
const firstElement3 = head(arr3);
// firstElement3は'a'です。

const arr4 = [true, false, true];
const firstElement4 = head(arr4);
// firstElement4はtrueです。

const arr5: [number, string, boolean] = [1, 'a', true];
const firstElement5 = head(arr5);
// firstElement5は1です。
```
