# create

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

原型オブジェクトからオブジェクトを作成します。プロパティが与えられた場合、オブジェクトに割り当てられるプロパティは、自身の列挙可能な文字列キーのプロパティのみが割り当てられます。

## インターフェース

```typescript
function create<T extends object, U extends object>(prototype: T, properties?: U): T & U;
```

### パラメータ

- `prototype` (`T extends object`): 継承するオブジェクト。
- `properties` (`U extends object`, オプション): オブジェクトに割り当てるプロパティ。

### 戻り値

(`T & U`): 作成された新しいオブジェクト。

## 例

```typescript
import { create } from 'es-toolkit/compat';

const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const john = create(person, { name: 'John' });

john.greet(); // 出力: Hello, my name is John
```
