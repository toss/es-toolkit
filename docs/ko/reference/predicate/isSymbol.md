# isSymbol

주어진 값이 symbol인지 확인해요.

```typescript
const result = isSymbol(value);
```

## 레퍼런스

### `isSymbol(value)`

값이 symbol인지 확인하고 싶을 때 `isSymbol`을 사용하세요. symbol은 고유한 식별자를 생성하거나 객체 프로퍼티의 키로 사용할 때 유용해요.

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

객체 프로퍼티 작업과 메타데이터 관리에 유용해요:

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
  [mySymbol]: 'secret value'
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

Well-known symbol과 iterator 패턴 활용:

```typescript
// iterator 구현 확인
function hasCustomIterator(obj: unknown): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  const keys = Reflect.ownKeys(obj);
  
  return keys.some(key => {
    if (isSymbol(key)) {
      return key === Symbol.iterator || key === Symbol.asyncIterator;
    }
    return false;
  });
}

// 사용 예시
const arrayObj = [1, 2, 3];
const setObj = new Set([1, 2, 3]);
const customIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
  }
};

console.log(hasCustomIterator(arrayObj)); // true
console.log(hasCustomIterator(setObj)); // true
console.log(hasCustomIterator(customIterable)); // true
console.log(hasCustomIterator({ a: 1 })); // false

// 객체 검사 유틸리티
function inspectObjectKeys(obj: object) {
  const keys = Reflect.ownKeys(obj);
  const result = {
    stringKeys: [] as string[],
    symbolKeys: [] as symbol[],
    totalKeys: keys.length
  };
  
  for (const key of keys) {
    if (isSymbol(key)) {
      result.symbolKeys.push(key);
    } else if (typeof key === 'string') {
      result.stringKeys.push(key);
    }
  }
  
  return result;
}

// 사용 예시
const testObj = {
  name: 'test',
  age: 25,
  [Symbol('id')]: 'unique-id',
  [Symbol.iterator]: function* () { yield 1; },
  [Symbol.toStringTag]: 'CustomObject'
};

const inspection = inspectObjectKeys(testObj);
console.log(inspection);
// {
//   stringKeys: ['name', 'age'],
//   symbolKeys: [Symbol(id), Symbol(Symbol.iterator), Symbol(Symbol.toStringTag)],
//   totalKeys: 5
// }
```

프라이빗 프로퍼티와 네임스페이스 관리:

```typescript
// 프라이빗 프로퍼티 시스템
class PrivatePropertiesManager {
  private keys = new Set<symbol>();
  
  createPrivateKey(description?: string): symbol {
    const key = Symbol(description);
    this.keys.add(key);
    return key;
  }
  
  isPrivateKey(key: unknown): boolean {
    return isSymbol(key) && this.keys.has(key);
  }
  
  getPrivateKeys(): symbol[] {
    return Array.from(this.keys);
  }
}

// 사용 예시
const manager = new PrivatePropertiesManager();
const nameKey = manager.createPrivateKey('name');
const ageKey = manager.createPrivateKey('age');
const publicSymbol = Symbol('public');

console.log(manager.isPrivateKey(nameKey)); // true
console.log(manager.isPrivateKey(publicSymbol)); // false

// 라이브러리 네임스페이스
const MyLibrary = {
  symbols: {
    CONFIG: Symbol('MyLibrary.config'),
    STATE: Symbol('MyLibrary.state'),
    EVENTS: Symbol('MyLibrary.events')
  },
  
  isLibrarySymbol(key: unknown): boolean {
    if (!isSymbol(key)) {
      return false;
    }
    
    return Object.values(this.symbols).includes(key);
  },
  
  attachToObject(obj: object, data: Record<string, any>) {
    const result = { ...obj } as any;
    
    if (data.config) {
      result[this.symbols.CONFIG] = data.config;
    }
    
    if (data.state) {
      result[this.symbols.STATE] = data.state;
    }
    
    return result;
  }
};

// 사용 예시
const userObj = { name: 'John' };
const enhancedObj = MyLibrary.attachToObject(userObj, {
  config: { theme: 'dark' },
  state: { isActive: true }
});

console.log(MyLibrary.isLibrarySymbol(MyLibrary.symbols.CONFIG)); // true
console.log(enhancedObj[MyLibrary.symbols.CONFIG]); // { theme: 'dark' }
```

타입 확인과 디버깅:

```typescript
// 값의 타입별 처리
function processValue(key: unknown, value: any) {
  if (isSymbol(key)) {
    return {
      keyType: 'symbol',
      keyDescription: key.description || 'no description',
      isWellKnown: typeof key.description === 'string' && key.description.startsWith('Symbol.'),
      value: value
    };
  }
  
  return {
    keyType: typeof key,
    key: key,
    value: value
  };
}

// 사용 예시
console.log(processValue(Symbol('test'), 'value1'));
// { keyType: 'symbol', keyDescription: 'test', isWellKnown: false, value: 'value1' }

console.log(processValue(Symbol.iterator, 'iterator'));
// { keyType: 'symbol', keyDescription: 'Symbol.iterator', isWellKnown: true, value: 'iterator' }

console.log(processValue('name', 'John'));
// { keyType: 'string', key: 'name', value: 'John' }

// 객체 직렬화에서 symbol 처리
function serializeWithSymbols(obj: object) {
  const result: any = {};
  const keys = Reflect.ownKeys(obj);
  
  for (const key of keys) {
    const value = (obj as any)[key];
    
    if (isSymbol(key)) {
      // symbol 키는 문자열로 변환하여 저장
      result[`__symbol_${key.description || 'anonymous'}`] = {
        type: 'symbol',
        description: key.description,
        value: value
      };
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

// 사용 예시
const objWithSymbols = {
  name: 'test',
  [Symbol('id')]: 'unique-123',
  [Symbol.iterator]: function* () { yield 1; }
};

const serialized = serializeWithSymbols(objWithSymbols);
console.log(serialized);
// {
//   name: 'test',
//   '__symbol_id': { type: 'symbol', description: 'id', value: 'unique-123' },
//   '__symbol_Symbol.iterator': { type: 'symbol', description: 'Symbol.iterator', value: [Function] }
// }
```

#### 파라미터

- `value` (`unknown`): symbol인지 확인할 값이에요.

#### 반환 값

(`value is symbol`): 값이 symbol이면 `true`, 그렇지 않으면 `false`를 반환해요.
