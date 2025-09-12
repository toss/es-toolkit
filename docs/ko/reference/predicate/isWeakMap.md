# isWeakMap

주어진 값이 WeakMap 인스턴스인지 확인해요.

```typescript
const result = isWeakMap(value);
```

## 레퍼런스

### `isWeakMap(value)`

값이 WeakMap 인스턴스인지 확인하고 싶을 때 `isWeakMap`을 사용하세요. WeakMap은 약한 참조로 객체를 키로 하는 키-값 저장소로, 메모리 누수를 방지할 때 유용해요.

```typescript
import { isWeakMap } from 'es-toolkit/predicate';

// WeakMap 인스턴스들
const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap([[{}, 'value']]);

console.log(isWeakMap(weakMap1)); // true
console.log(isWeakMap(weakMap2)); // true

// WeakMap이 아닌 값들
console.log(isWeakMap(new Map())); // false
console.log(isWeakMap(new Set())); // false
console.log(isWeakMap(new WeakSet())); // false
console.log(isWeakMap({})); // false
console.log(isWeakMap([])); // false
console.log(isWeakMap(null)); // false
console.log(isWeakMap(undefined)); // false
```

메모리 관리와 메타데이터 저장에 유용해요:

```typescript
// 안전한 메타데이터 관리
function createMetadataManager() {
  const storage = new WeakMap<object, any>();
  
  return {
    setMetadata(obj: object, metadata: any): void {
      if (isWeakMap(storage)) {
        storage.set(obj, metadata);
      }
    },
    
    getMetadata(obj: object): any {
      if (isWeakMap(storage)) {
        return storage.get(obj);
      }
      return undefined;
    },
    
    hasMetadata(obj: object): boolean {
      if (isWeakMap(storage)) {
        return storage.has(obj);
      }
      return false;
    }
  };
}

// 사용 예시
const manager = createMetadataManager();
const userObj = { name: 'John' };
const productObj = { id: 1, title: 'Book' };

manager.setMetadata(userObj, { role: 'admin', lastLogin: new Date() });
manager.setMetadata(productObj, { category: 'education', inStock: true });

console.log(manager.getMetadata(userObj)); // { role: 'admin', lastLogin: Date }
console.log(manager.hasMetadata(productObj)); // true

// DOM 요소와 이벤트 핸들러 관리
class EventManager {
  private handlers = new WeakMap<Element, Map<string, Function[]>>();
  
  addHandler(element: Element, event: string, handler: Function): void {
    if (!isWeakMap(this.handlers)) {
      return;
    }
    
    if (!this.handlers.has(element)) {
      this.handlers.set(element, new Map());
    }
    
    const elementHandlers = this.handlers.get(element)!;
    
    if (!elementHandlers.has(event)) {
      elementHandlers.set(event, []);
    }
    
    elementHandlers.get(event)!.push(handler);
    element.addEventListener(event, handler as EventListener);
  }
  
  removeAllHandlers(element: Element): void {
    if (!isWeakMap(this.handlers)) {
      return;
    }
    
    const elementHandlers = this.handlers.get(element);
    
    if (elementHandlers) {
      for (const [event, handlers] of elementHandlers) {
        handlers.forEach(handler => {
          element.removeEventListener(event, handler as EventListener);
        });
      }
      
      this.handlers.delete(element);
    }
  }
  
  getHandlerCount(element: Element): number {
    if (!isWeakMap(this.handlers)) {
      return 0;
    }
    
    const elementHandlers = this.handlers.get(element);
    
    if (!elementHandlers) {
      return 0;
    }
    
    let count = 0;
    for (const handlers of elementHandlers.values()) {
      count += handlers.length;
    }
    
    return count;
  }
}

// 사용 예시 (브라우저 환경에서)
const eventManager = new EventManager();

// DOM 요소가 있다고 가정
// const button = document.createElement('button');
// const div = document.createElement('div');

// eventManager.addHandler(button, 'click', () => console.log('Button clicked'));
// eventManager.addHandler(div, 'mouseover', () => console.log('Div hovered'));

// console.log(eventManager.getHandlerCount(button)); // 1
// eventManager.removeAllHandlers(button); // 메모리 정리
```

객체별 캐시와 프라이빗 데이터 관리:

```typescript
// 객체별 캐시 시스템
class ObjectCache {
  private cache: unknown;
  
  constructor() {
    this.cache = new WeakMap<object, Map<string, any>>();
  }
  
  set(obj: object, key: string, value: any): void {
    if (!isWeakMap(this.cache)) {
      return;
    }
    
    if (!this.cache.has(obj)) {
      this.cache.set(obj, new Map());
    }
    
    this.cache.get(obj)!.set(key, value);
  }
  
  get(obj: object, key: string): any {
    if (!isWeakMap(this.cache)) {
      return undefined;
    }
    
    const objCache = this.cache.get(obj);
    return objCache ? objCache.get(key) : undefined;
  }
  
  has(obj: object, key: string): boolean {
    if (!isWeakMap(this.cache)) {
      return false;
    }
    
    const objCache = this.cache.get(obj);
    return objCache ? objCache.has(key) : false;
  }
  
  clearObject(obj: object): void {
    if (isWeakMap(this.cache)) {
      this.cache.delete(obj);
    }
  }
  
  getStorageType(): string {
    if (isWeakMap(this.cache)) {
      return 'WeakMap';
    }
    return 'unknown';
  }
}

// 사용 예시
const cache = new ObjectCache();
const user = { id: 1, name: 'Alice' };
const product = { id: 101, title: 'Laptop' };

cache.set(user, 'computedScore', 95);
cache.set(user, 'lastAccess', new Date());
cache.set(product, 'viewCount', 42);

console.log(cache.get(user, 'computedScore')); // 95
console.log(cache.has(product, 'viewCount')); // true
console.log(cache.getStorageType()); // 'WeakMap'

// 객체별 프라이빗 데이터
function createPrivateDataStore() {
  const privateData: unknown = new WeakMap<object, Record<string, any>>();
  
  return {
    setPrivate(obj: object, key: string, value: any): boolean {
      if (isWeakMap(privateData)) {
        if (!privateData.has(obj)) {
          privateData.set(obj, {});
        }
        privateData.get(obj)![key] = value;
        return true;
      }
      return false;
    },
    
    getPrivate(obj: object, key: string): any {
      if (isWeakMap(privateData)) {
        const data = privateData.get(obj);
        return data ? data[key] : undefined;
      }
      return undefined;
    },
    
    hasPrivate(obj: object, key: string): boolean {
      if (isWeakMap(privateData)) {
        const data = privateData.get(obj);
        return data ? key in data : false;
      }
      return false;
    }
  };
}

// 사용 예시
const privateStore = createPrivateDataStore();
const person = { name: 'Bob' };

privateStore.setPrivate(person, 'ssn', '123-45-6789');
privateStore.setPrivate(person, 'salary', 50000);

console.log(privateStore.getPrivate(person, 'ssn')); // '123-45-6789'
console.log(privateStore.hasPrivate(person, 'salary')); // true

// person 객체가 가비지 컬렉션되면 WeakMap의 데이터도 자동 정리됨
```

메모리 누수 방지와 성능 최적화:

```typescript
// 메모리 안전한 이벤트 에미터
class SafeEventEmitter {
  private listeners: unknown;
  
  constructor() {
    this.listeners = new WeakMap<object, Map<string, Function[]>>();
  }
  
  on(target: object, event: string, callback: Function): void {
    if (!isWeakMap(this.listeners)) {
      console.warn('이벤트 리스너 저장소가 WeakMap이 아닙니다');
      return;
    }
    
    if (!this.listeners.has(target)) {
      this.listeners.set(target, new Map());
    }
    
    const targetEvents = this.listeners.get(target)!;
    
    if (!targetEvents.has(event)) {
      targetEvents.set(event, []);
    }
    
    targetEvents.get(event)!.push(callback);
  }
  
  emit(target: object, event: string, ...args: any[]): void {
    if (!isWeakMap(this.listeners)) {
      return;
    }
    
    const targetEvents = this.listeners.get(target);
    
    if (targetEvents && targetEvents.has(event)) {
      const callbacks = targetEvents.get(event)!;
      callbacks.forEach(callback => callback(...args));
    }
  }
  
  getListenerCount(target: object, event?: string): number {
    if (!isWeakMap(this.listeners)) {
      return 0;
    }
    
    const targetEvents = this.listeners.get(target);
    
    if (!targetEvents) {
      return 0;
    }
    
    if (event) {
      const callbacks = targetEvents.get(event);
      return callbacks ? callbacks.length : 0;
    }
    
    let total = 0;
    for (const callbacks of targetEvents.values()) {
      total += callbacks.length;
    }
    
    return total;
  }
}

// 사용 예시
const emitter = new SafeEventEmitter();
const model = { data: 'initial' };
const view = { rendered: false };

emitter.on(model, 'change', (newData: string) => {
  console.log(`모델 변경됨: ${newData}`);
});

emitter.on(view, 'render', () => {
  console.log('뷰 렌더링 완료');
});

emitter.emit(model, 'change', 'updated data'); // 모델 변경됨: updated data
emitter.emit(view, 'render'); // 뷰 렌더링 완료

console.log(emitter.getListenerCount(model, 'change')); // 1
console.log(emitter.getListenerCount(view)); // 1

// 컬렉션 타입 검증
function analyzeCollection(collection: unknown) {
  const result = {
    type: 'unknown',
    isWeak: false,
    canIterate: false,
    hasSize: false
  };
  
  if (isWeakMap(collection)) {
    result.type = 'WeakMap';
    result.isWeak = true;
    result.canIterate = false; // WeakMap은 이터러블하지 않음
    result.hasSize = false; // WeakMap은 size 프로퍼티 없음
  } else if (collection instanceof Map) {
    result.type = 'Map';
    result.isWeak = false;
    result.canIterate = true;
    result.hasSize = true;
  } else if (collection instanceof Set) {
    result.type = 'Set';
    result.isWeak = false;
    result.canIterate = true;
    result.hasSize = true;
  } else if (collection instanceof WeakSet) {
    result.type = 'WeakSet';
    result.isWeak = true;
    result.canIterate = false;
    result.hasSize = false;
  }
  
  return result;
}

// 사용 예시
console.log(analyzeCollection(new WeakMap()));
// { type: 'WeakMap', isWeak: true, canIterate: false, hasSize: false }

console.log(analyzeCollection(new Map()));
// { type: 'Map', isWeak: false, canIterate: true, hasSize: true }

console.log(analyzeCollection(new Set()));
// { type: 'Set', isWeak: false, canIterate: true, hasSize: true }
```

#### 파라미터

- `value` (`unknown`): WeakMap 인스턴스인지 확인할 값이에요.

#### 반환 값

(`value is WeakMap<WeakKey, any>`): 값이 WeakMap 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
