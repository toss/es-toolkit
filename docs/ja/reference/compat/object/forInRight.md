# forInRight

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトを逆順に反復処理し、各プロパティに対して `iteratee` 関数を呼び出します。

継承されたプロパティを含む、文字列キーのプロパティを逆順に反復処理します。

`iteratee` 関数が `false` を返すと、反復処理は早期に終了します。

## インターフェース

```typescript
function forInRight<T>(object: T, iteratee?: (value: T[keyof T], key: string, collection: T) => any): T;
function forInRight<T>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;
```

### パラメータ

- `object` (`T | null | undefined`): 反復処理するオブジェクト
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`): 各反復で呼び出される関数。デフォルトは `identity` 関数

### 戻り値

(`T | null | undefined`): `object` を返します

## 例

```typescript
import { forInRight } from 'es-toolkit/compat';

function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
};

// Shapeのインスタンスを作成
const square = new Shape();

// すべての列挙可能なプロパティ（継承されたプロパティを含む）に対して逆順に反復処理
forInRight(square, function (value, key) {
  console.log(key, value);
});
// 出力（逆順）:
// 'move', [Function]
// 'y', 0
// 'x', 0

// iteratee関数がfalseを返すと、反復処理は早期に終了
forInRight(square, function (value, key) {
  console.log(key, value);
  return key !== 'y'; // 'y'で停止
});
// 出力:
// 'move', [Function]
// 'y', 0
```
