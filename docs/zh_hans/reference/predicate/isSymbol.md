# isSymbol

检查给定值是否为 `symbol`。

```typescript
const result = isSymbol(value);
```

## 参考

### `isSymbol(value)`

当您想检查值是否为 `symbol` 时,请使用 `isSymbol`。

```typescript
import { isSymbol } from 'es-toolkit/predicate';

// symbol 值
const sym1 = Symbol('description');
const sym2 = Symbol.for('global');
const sym3 = Symbol.iterator;

console.log(isSymbol(sym1)); // true
console.log(isSymbol(sym2)); // true
console.log(isSymbol(sym3)); // true

// 非 symbol 值
console.log(isSymbol('symbol')); // false
console.log(isSymbol(123)); // false
console.log(isSymbol(true)); // false
console.log(isSymbol(null)); // false
console.log(isSymbol(undefined)); // false
console.log(isSymbol({})); // false
console.log(isSymbol([])); // false
```

对安全访问对象属性或管理元数据非常有用。

```typescript
// 安全的属性访问
function getPropertyValue(obj: object, key: unknown) {
  if (isSymbol(key)) {
    // TypeScript 将 key 推断为 symbol
    return (obj as any)[key];
  }

  if (typeof key === 'string') {
    return (obj as any)[key];
  }

  return undefined;
}

// 使用示例
const mySymbol = Symbol('myKey');
const obj = {
  name: 'John',
  [mySymbol]: 'secret value',
};

console.log(getPropertyValue(obj, 'name')); // 'John'
console.log(getPropertyValue(obj, mySymbol)); // 'secret value'
console.log(getPropertyValue(obj, 123)); // undefined

// 元数据存储
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

// 使用示例
const manager = new MetadataManager();
const typeSymbol = Symbol('type');
const versionSymbol = Symbol('version');

manager.setMetadata(typeSymbol, 'user');
manager.setMetadata(versionSymbol, '1.0');
manager.setMetadata('invalid', 'value'); // false, 不是 symbol

console.log(manager.getMetadata(typeSymbol)); // 'user'
console.log(manager.hasMetadata(versionSymbol)); // true
```

#### 参数

- `value` (`unknown`): 要检查是否为 symbol 的值。

#### 返回值

(`value is symbol`): 如果值是 symbol,则返回 `true`,否则返回 `false`。
