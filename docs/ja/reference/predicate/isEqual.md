# isEqual

`isEqual` 関数は2つの値が同じかどうかを確認し、`Date`、`RegExp`、深いオブジェクト比較もサポートしています。

## シグネチャ

```typescript
function isEqual(a: unknown, b: unknown): boolean;
```

## パラメータ

- **`a`**: `unknown` - 比較する1つ目の値。
- **`b`**: `unknown` - 比較する2つ目の値。

## 戻り値

- **`boolean`** - 2つの値が同じであれば `true`、そうでなければ `false` を返します。

## 例

### 例1: プリミティブ型の値の比較

```javascript
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true
isEqual(1, 2); // false
isEqual('hello', 'world'); // false
isEqual(true, false); // false
```

### 例2: 特殊なケースの比較

```javascript
isEqual(NaN, NaN); // true
isEqual(+0, -0); // true
```

### 例3: Dateオブジェクトの比較

```javascript
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-01');
isEqual(date1, date2); // true

const date3 = new Date('2021-01-01');
isEqual(date1, date3); // false
```

### 例4: 正規表現オブジェクトの比較

```javascript
const regex1 = /hello/g;
const regex2 = /hello/g;
isEqual(regex1, regex2); // true

const regex3 = /hello/i;
isEqual(regex1, regex3); // false
```

### 例5: オブジェクトの比較

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
isEqual(obj1, obj2); // true

const obj3 = { a: 1, b: { c: 3 } };
isEqual(obj1, obj3); // false

const obj4 = { a: 1, b: 2 };
const obj5 = { a: 1, c: 2 };
isEqual(obj4, obj5); // false
```

### 例6: 配列の比較

```javascript
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
isEqual(arr1, arr2); // true

const arr3 = [1, 2, 4];
isEqual(arr1, arr3); // false

const arr4 = [1, 2];
isEqual(arr1, arr4); // false
```
