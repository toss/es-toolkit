# join

配列の要素を文字列に結合します。

## インターフェース

```typescript
function join<T>(array: T[], separator: string): string;
```

### パラメータ

- `array` (`T[]`) - 結合する配列です。
- `separator` (`string`) - 要素を結合するために用いるセパレータ、デフォルトは一般的なセパレータ `,` です。

### 戻り値

(`string`): - 指定されたセパレータで結合された配列のすべての要素を含む文字列を返します。

## 例

````typescript
```typescript
const arr = ["a","b","c"];
const result = join(arr, "~");
console.log(result); // Output: "a~b~c"
````

```

```
