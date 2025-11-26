# isSymbol

주어진 값이 `symbol`인지 확인해요.

```typescript
const result = isSymbol(value);
```

## 사용법

### `isSymbol(value)`

값이 `symbol`인지 확인하고 싶을 때 `isSymbol`을 사용하세요.

```typescript
import { isSymbol } from 'es-toolkit/predicate';

// symbol 값들
const sym1 = Symbol('description');
const sym2 = Symbol.for('global');
const sym3 = Symbol.iterator;

console.log(isSymbol(sym1)); // true
console.log(isSymbol(sym2)); // true
console.log(isSymbol(sym3)); // true

// symbol이 아닌 값들
console.log(isSymbol('symbol')); // false
console.log(isSymbol(123)); // false
console.log(isSymbol(true)); // false
console.log(isSymbol(null)); // false
console.log(isSymbol(undefined)); // false
console.log(isSymbol({})); // false
console.log(isSymbol([])); // false
```

객체의 프로퍼티에 안전하게 접근하거나 메타데이터를 관리할 때 유용해요.

```typescript
// 안전한 프로퍼티 접근
function getPropertyValue(obj: object, key: unknown) {
  if (isSymbol(key)) {
    // TypeScript가 key를 symbol로 추론
    return (obj as any)[key];
  }

  if (typeof key === 'string') {
    return (obj as any)[key];
  }

  return undefined;
}

// 사용 예시
const mySymbol = Symbol('myKey');
const obj = {
  name: 'John',
  [mySymbol]: 'secret value',
};

console.log(getPropertyValue(obj, 'name')); // 'John'
console.log(getPropertyValue(obj, mySymbol)); // 'secret value'
console.log(getPropertyValue(obj, 123)); // undefined

// 메타데이터 저장소
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

// 사용 예시
const manager = new MetadataManager();
const typeSymbol = Symbol('type');
const versionSymbol = Symbol('version');

manager.setMetadata(typeSymbol, 'user');
manager.setMetadata(versionSymbol, '1.0');
manager.setMetadata('invalid', 'value'); // false, symbol이 아님

console.log(manager.getMetadata(typeSymbol)); // 'user'
console.log(manager.hasMetadata(versionSymbol)); // true
```

#### 파라미터

- `value` (`unknown`): symbol인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 symbol이면 `true`, 그렇지 않으면 `false`를 반환해요.
