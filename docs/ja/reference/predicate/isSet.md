# isSet

与えられた値が `Set` インスタンスかどうかを確認します。

```typescript
const result = isSet(value);
```

## 使用法

### `isSet(value)`

値が `Set` インスタンスかどうかを確認したい場合は `isSet` を使用してください。`Set` オブジェクトを他のオブジェクトと区別する際に便利です。

```typescript
import { isSet } from 'es-toolkit/predicate';

// Set インスタンス
const set1 = new Set();
const set2 = new Set([1, 2, 3]);
const set3 = new Set(['a', 'b', 'c']);

console.log(isSet(set1)); // true
console.log(isSet(set2)); // true
console.log(isSet(set3)); // true

// Set でない値
console.log(isSet(new Map())); // false
console.log(isSet(new WeakSet())); // false
console.log(isSet([])); // false
console.log(isSet({})); // false
console.log(isSet(null)); // false
console.log(isSet(undefined)); // false
```

`Set`、`Array`、`Map` などの JavaScript 組み込みオブジェクトごとに異なるロジックを実行する際に便利です。

```typescript
// コレクションサイズの計算
function getCollectionSize(collection: unknown): number {
  if (isSet(collection)) {
    // TypeScript が collection を Set<any> として推論
    return collection.size;
  }

  if (Array.isArray(collection)) {
    return collection.length;
  }

  if (collection && typeof collection === 'object') {
    return Object.keys(collection).length;
  }

  return 0;
}

// 使用例
console.log(getCollectionSize(new Set([1, 2, 3]))); // 3
console.log(getCollectionSize([1, 2, 3])); // 3
console.log(getCollectionSize({ a: 1, b: 2 })); // 2

// 重複削除ユーティリティ
function removeDuplicates(data: unknown) {
  if (isSet(data)) {
    // すでに Set ならそのまま返す
    return data;
  }

  if (Array.isArray(data)) {
    return new Set(data);
  }

  // 他のタイプは変換しない
  return data;
}

const duplicatedArray = [1, 2, 2, 3, 3, 3];
const uniqueSet = removeDuplicates(duplicatedArray);
console.log(uniqueSet); // Set { 1, 2, 3 }

const existingSet = new Set(['a', 'b']);
console.log(removeDuplicates(existingSet)); // Set { 'a', 'b' } (同じ Set を返す)
```

Set の操作やデータ変換にも幅広く活用できます。

```typescript
// ユニバーサルコレクションのマージ
function mergeCollections(...collections: unknown[]): Set<any> {
  const result = new Set();

  for (const collection of collections) {
    if (isSet(collection)) {
      // Set のすべての値を結果に追加
      for (const item of collection) {
        result.add(item);
      }
    } else if (Array.isArray(collection)) {
      // 配列のすべての値を追加
      for (const item of collection) {
        result.add(item);
      }
    }
  }

  return result;
}

// 使用例
const set1 = new Set([1, 2, 3]);
const array1 = [3, 4, 5];
const set2 = new Set(['a', 'b']);

const merged = mergeCollections(set1, array1, set2);
console.log(merged); // Set { 1, 2, 3, 4, 5, 'a', 'b' }

// コレクションの交差を計算
function getIntersection(coll1: unknown, coll2: unknown): Set<any> {
  const set1 = isSet(coll1) ? coll1 : new Set(Array.isArray(coll1) ? coll1 : []);
  const set2 = isSet(coll2) ? coll2 : new Set(Array.isArray(coll2) ? coll2 : []);

  const intersection = new Set();

  for (const item of set1) {
    if (set2.has(item)) {
      intersection.add(item);
    }
  }

  return intersection;
}

// 使用例
const setA = new Set([1, 2, 3, 4]);
const arrayB = [3, 4, 5, 6];

const intersection = getIntersection(setA, arrayB);
console.log(intersection); // Set { 3, 4 }
```

#### パラメータ

- `value` (`unknown`): Set インスタンスかどうかを確認する値です。

#### 戻り値

(`boolean`): 値が Set インスタンスの場合は `true`、それ以外の場合は `false` を返します。
