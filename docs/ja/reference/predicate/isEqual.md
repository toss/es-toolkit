# isEqual

二つの値が深く等しいかどうかを確認します。

```typescript
const result = isEqual(a, b);
```

## 参照

### `isEqual(a, b)`

オブジェクト、配列、Date、RegExp などを含めて二つの値が深く等しいかどうかを確認したい場合に `isEqual` を使用してください。参照が異なっていても内容が同じであれば `true` を返します。単体テストやデータ比較に便利です。

```typescript
import { isEqual } from 'es-toolkit/predicate';

// プリミティブ型の比較
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true

// 特殊値の処理
isEqual(NaN, NaN); // true
isEqual(+0, -0); // true
```

オブジェクトと配列の深い比較をサポートします。

```typescript
import { isEqual } from 'es-toolkit/predicate';

// 深いオブジェクトの比較
const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
isEqual(obj1, obj2); // true

// 配列の比較
const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4]];
isEqual(arr1, arr2); // true
```

Date、RegExp、Map、Set などのオブジェクトも比較できます。

```typescript
import { isEqual } from 'es-toolkit/predicate';

// 日付の比較
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-01');
isEqual(date1, date2); // true

// 正規表現の比較
const regex1 = /hello/g;
const regex2 = /hello/g;
isEqual(regex1, regex2); // true

// Map と Set の比較
const map1 = new Map([['key', 'value']]);
const map2 = new Map([['key', 'value']]);
isEqual(map1, map2); // true

const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);
isEqual(set1, set2); // true
```

単体テストでよく使用されます。

```typescript
import { isEqual } from 'es-toolkit/predicate';

function testApiResponse() {
  const expected = { status: 200, data: { message: 'success' } };
  const actual = { status: 200, data: { message: 'success' } };

  if (isEqual(expected, actual)) {
    console.log('テスト合格！');
  } else {
    console.log('テスト失敗！');
  }
}
```

#### パラメータ

- `a` (`unknown`): 比較する最初の値です。
- `b` (`unknown`): 比較する2番目の値です。

#### 戻り値

(`boolean`): 二つの値が深く等しい場合は `true`、そうでなければ `false` を返します。
