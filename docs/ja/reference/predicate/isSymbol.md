# isSymbol

与えられた値が `symbol` かどうかを確認します。

```typescript
const result = isSymbol(value);
```

## 使用法

### `isSymbol(value)`

値が `symbol` かどうかを確認したい場合は `isSymbol` を使用してください。

```typescript
import { isSymbol } from 'es-toolkit/predicate';

// symbol の値
const sym1 = Symbol('description');
const sym2 = Symbol.for('global');
const sym3 = Symbol.iterator;

console.log(isSymbol(sym1)); // true
console.log(isSymbol(sym2)); // true
console.log(isSymbol(sym3)); // true

// symbol でない値
console.log(isSymbol('symbol')); // false
console.log(isSymbol(123)); // false
console.log(isSymbol(true)); // false
console.log(isSymbol(null)); // false
console.log(isSymbol(undefined)); // false
console.log(isSymbol({})); // false
console.log(isSymbol([])); // false
```

オブジェクトのプロパティに安全にアクセスしたり、メタデータを管理する際に便利です。

```typescript
// 安全なプロパティアクセス
function getPropertyValue(obj: object, key: unknown) {
  if (isSymbol(key)) {
    // TypeScript が key を symbol として推論
    return (obj as any)[key];
  }

  if (typeof key === 'string') {
    return (obj as any)[key];
  }

  return undefined;
}

// 使用例
const mySymbol = Symbol('myKey');
const obj = {
  name: 'John',
  [mySymbol]: 'secret value',
};

console.log(getPropertyValue(obj, 'name')); // 'John'
console.log(getPropertyValue(obj, mySymbol)); // 'secret value'
console.log(getPropertyValue(obj, 123)); // undefined

// メタデータストレージ
class MetadataManager {
  private metadata = new Map<symbol, any>();

  setMetadata(key: unknown, value: any): boolean {
    if (isSymbol(key)) {
      this.metadata.set(key, value);
      return true;
    }
    return false;
  }

  getMetadata(key: unknown): any {
    if (isSymbol(key)) {
      return this.metadata.get(key);
    }
    return undefined;
  }

  hasMetadata(key: unknown): boolean {
    if (isSymbol(key)) {
      return this.metadata.has(key);
    }
    return false;
  }
}

// 使用例
const manager = new MetadataManager();
const typeSymbol = Symbol('type');
const versionSymbol = Symbol('version');

manager.setMetadata(typeSymbol, 'user');
manager.setMetadata(versionSymbol, '1.0');
manager.setMetadata('invalid', 'value'); // false, symbol ではない

console.log(manager.getMetadata(typeSymbol)); // 'user'
console.log(manager.hasMetadata(versionSymbol)); // true
```

#### パラメータ

- `value` (`unknown`): symbol かどうかを確認する値です。

#### 戻り値

(`boolean`): 値が symbol の場合は `true`、それ以外の場合は `false` を返します。
