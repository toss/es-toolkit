# pullAllBy

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

カスタム反復子を使用して、配列からすべての指定された値を削除します。

この関数は`arr`をその場で変更します。
元の配列を変更せずに値を削除したい場合は、`differenceBy`を使用してください。

## インターフェース

```typescript
function pullAllBy<T>(arr: T[], values: T[], iteratee: (value: T) => unknown): T[];
function pullAllBy<T>(arr: T[], values: T[], iteratee: Partial<T>): T[];
function pullAllBy<T>(arr: T[], values: T[], iteratee: [keyof T, unknown]): T[];
function pullAllBy<T, K extends keyof T>(arr: T[], values: T[], iteratee: K): T[];
function pullAllBy<T>(arr: T[], values: T[], _iteratee: ((value: any) => any) | PropertyKey | object | null);
```

### パラメータ

- `arr` (`T[]`): 変更する配列です。
- `values` (`T[]`): 配列から削除する値です。
- `_iteratee` (`((value: any) => any) | PropertyKey | object | null`): 要素ごとに呼び出される反復子です。

### 戻り値

(`T[]`): 指定された値が削除された修正済み配列です。