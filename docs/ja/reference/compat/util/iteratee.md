# iteratee

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::
コレクションの要素から値を返す関数を作成します。

`iteratee` 関数に渡される引数の種類によって、返される関数の動作が異なります。

- **関数**: 渡された関数をそのまま返します。
- **プロパティ名**: 要素から指定されたプロパティの値を返します。
- **プロパティ-値のペア**: 要素のプロパティが指定された値と一致するかどうかを示すブール値を返します。
- **部分オブジェクト**: 要素が部分オブジェクトのプロパティと値に一致するかどうかを示すブール値を返します。

引数を提供しないか、`null` を渡すと、この関数は [要素をそのまま返す関数](../../function/identity.md) を返します。

## インターフェース

```typescript
function iteratee(value?: null): (value: T) => T;
function iteratee<F extends (...args: any[]) => unknown>(func: F): F;
function iteratee(value: symbol | number | string | object | null): (...args: any[]) => any;
```

### パラメータ

- `value` (`symbol | number | string | object | null | ((...args: any[]) => any)`): 反復子に変換する値。

### 戻り値

(`(...args: any[]) => unknown`): 新しい反復子関数。

## 例

```typescript
const func = iteratee();
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [{ a: 1 }, { a: 2 }, { a: 3 }]

const func = iteratee((object) => object.a);
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]

const func = iteratee('a');
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]

const func = iteratee({ a: 1 });
[{ a: 1 }, { a: 2 }, { a: 3 }].find(func) // => { a: 1 }

const func = iteratee(['a', 1]);
[{ a: 1 }, { a: 2 }, { a: 3 }].find(func) // => { a: 1 }
```
