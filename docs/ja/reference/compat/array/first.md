# first

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列の最初の要素を返します。配列が空の場合は`undefined`を返します。

この関数は配列を受け取り、配列の最初の要素を返します。
配列が空の場合、関数は`undefined`を返します。

## インターフェース

```typescript
function first<T>(arr: ArrayLike<T> | undefined | null): T | undefined;
```

### パラメータ

- `arr` (`ArrayLike<T> | undefined | null`): 最初の要素を取得するための配列です。

### 戻り値

(`T | undefined`): 配列の最初の要素、または配列が空の場合は`undefined`です。

## 例

```typescript
const arr1 = [1, 2, 3];
const firstElement1 = first(arr1);
// firstElement1は1です。

const arr2: string[] = [];
const firstElement2 = first(arr2);
// firstElement2はundefinedです。

const arr3 = ['a', 'b', 'c'];
const firstElement3 = first(arr3);
// firstElement3は'a'です。

const arr4 = [true, false, true];
const firstElement4 = first(arr4);
// firstElement4はtrueです。

const arr5: [number, string, boolean] = [1, 'a', true];
const firstElement5 = first(arr5);
// firstElement5は1です。
```
