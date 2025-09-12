# isWeakSet

주어진 값이 WeakSet 인스턴스인지 확인해요.

```typescript
const result = isWeakSet(value);
```

## 레퍼런스

### `isWeakSet(value)`

값이 WeakSet 인스턴스인지 확인하고 싶을 때 `isWeakSet`을 사용하세요. WeakSet은 약한 참조로 객체를 저장하는 컬렉션으로, 메모리 누수 없이 객체 추적이나 마킹에 유용해요.

```typescript
import { isWeakSet } from 'es-toolkit/predicate';

// WeakSet 인스턴스들
const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet([{}, []]);

console.log(isWeakSet(weakSet1)); // true
console.log(isWeakSet(weakSet2)); // true

// WeakSet이 아닌 값들
console.log(isWeakSet(new Set())); // false
console.log(isWeakSet(new Map())); // false
console.log(isWeakSet(new WeakMap())); // false
console.log(isWeakSet([])); // false
console.log(isWeakSet({})); // false
console.log(isWeakSet(null)); // false
console.log(isWeakSet(undefined)); // false
```

객체 추적과 상태 관리에 유용해요:

```typescript
// 객체 상태 추적기
function createObjectTracker() {
  const trackedObjects: unknown = new WeakSet();
  const processedObjects: unknown = new WeakSet();
  
  return {
    startTracking(obj: object): boolean {
      if (isWeakSet(trackedObjects)) {
        trackedObjects.add(obj);
        return true;
      }
      return false;
    },
    
    isTracked(obj: object): boolean {
      if (isWeakSet(trackedObjects)) {
        return trackedObjects.has(obj);
      }
      return false;
    },
    
    markAsProcessed(obj: object): boolean {
      if (isWeakSet(processedObjects) && this.isTracked(obj)) {
        processedObjects.add(obj);
        return true;
      }
      return false;
    },
    
    isProcessed(obj: object): boolean {
      if (isWeakSet(processedObjects)) {
        return processedObjects.has(obj);
      }
      return false;
    }
  };
}

// 사용 예시
const tracker = createObjectTracker();
const user = { id: 1, name: 'Alice' };
const product = { id: 101, title: 'Book' };

tracker.startTracking(user);
tracker.startTracking(product);

console.log(tracker.isTracked(user)); // true
console.log(tracker.isProcessed(user)); // false

tracker.markAsProcessed(user);
console.log(tracker.isProcessed(user)); // true

// 메모리 누수 방지 캐시
class SafeObjectCache {
  private cache = new Map<object, any>();
  private objectRegistry: unknown;
  
  constructor() {
    this.objectRegistry = new WeakSet<object>();
  }
  
  set(key: object, value: any): void {
    if (isWeakSet(this.objectRegistry)) {
      this.objectRegistry.add(key);
      this.cache.set(key, value);
    }
  }
  
  get(key: object): any {
    if (this.isRegistered(key)) {
      return this.cache.get(key);
    }
    return undefined;
  }
  
  has(key: object): boolean {
    return this.isRegistered(key) && this.cache.has(key);
  }
  
  delete(key: object): boolean {
    return this.cache.delete(key);
  }
  
  isRegistered(key: object): boolean {
    if (isWeakSet(this.objectRegistry)) {
      return this.objectRegistry.has(key);
    }
    return false;
  }
  
  getStorageInfo() {
    return {
      cacheSize: this.cache.size,
      useWeakSet: isWeakSet(this.objectRegistry)
    };
  }
}

// 사용 예시
const cache = new SafeObjectCache();
const obj1 = { name: 'test1' };
const obj2 = { name: 'test2' };

cache.set(obj1, 'value1');
cache.set(obj2, 'value2');

console.log(cache.get(obj1)); // 'value1'
console.log(cache.isRegistered(obj1)); // true
console.log(cache.getStorageInfo()); // { cacheSize: 2, useWeakSet: true }
```

방문자 패턴과 객체 처리 상태 관리:

```typescript
// 방문자 패턴 구현
class ObjectVisitor {
  private visited: unknown;
  private processing: unknown;
  
  constructor() {
    this.visited = new WeakSet<object>();
    this.processing = new WeakSet<object>();
  }
  
  visit(obj: object, processor: (obj: object) => void): void {
    if (!isWeakSet(this.visited) || !isWeakSet(this.processing)) {
      return;
    }
    
    if (this.visited.has(obj)) {
      return; // 이미 방문함
    }
    
    if (this.processing.has(obj)) {
      console.warn('순환 참조 감지됨');
      return;
    }
    
    this.processing.add(obj);
    
    try {
      processor(obj);
      this.visited.add(obj);
    } finally {
      this.processing.delete(obj);
    }
  }
  
  hasVisited(obj: object): boolean {
    if (isWeakSet(this.visited)) {
      return this.visited.has(obj);
    }
    return false;
  }
  
  isProcessing(obj: object): boolean {
    if (isWeakSet(this.processing)) {
      return this.processing.has(obj);
    }
    return false;
  }
  
  reset(): void {
    this.visited = new WeakSet<object>();
    this.processing = new WeakSet<object>();
  }
}

// 사용 예시
const visitor = new ObjectVisitor();

const nodeA = { name: 'A', children: [] as any[] };
const nodeB = { name: 'B', children: [] as any[] };
const nodeC = { name: 'C', children: [] as any[] };

nodeA.children.push(nodeB);
nodeB.children.push(nodeC);
nodeC.children.push(nodeA); // 순환 참조

function processNode(node: any) {
  console.log(`처리 중: ${node.name}`);
  
  for (const child of node.children) {
    visitor.visit(child, processNode);
  }
}

visitor.visit(nodeA, processNode);
// 출력:
// 처리 중: A
// 처리 중: B  
// 처리 중: C
// 순환 참조 감지됨 (nodeA 재방문 시도)

console.log(visitor.hasVisited(nodeA)); // true
console.log(visitor.hasVisited(nodeB)); // true

// 이벤트 구독자 관리
class EventSubscriptionManager {
  private subscribers: unknown;
  private activeSubscriptions = new Map<string, Set<object>>();
  
  constructor() {
    this.subscribers = new WeakSet<object>();
  }
  
  subscribe(subscriber: object, eventType: string): boolean {
    if (!isWeakSet(this.subscribers)) {
      return false;
    }
    
    this.subscribers.add(subscriber);
    
    if (!this.activeSubscriptions.has(eventType)) {
      this.activeSubscriptions.set(eventType, new Set());
    }
    
    this.activeSubscriptions.get(eventType)!.add(subscriber);
    return true;
  }
  
  unsubscribe(subscriber: object, eventType: string): boolean {
    const eventSubscribers = this.activeSubscriptions.get(eventType);
    
    if (eventSubscribers) {
      eventSubscribers.delete(subscriber);
      
      if (eventSubscribers.size === 0) {
        this.activeSubscriptions.delete(eventType);
      }
      
      return true;
    }
    
    return false;
  }
  
  isSubscriber(subscriber: object): boolean {
    if (isWeakSet(this.subscribers)) {
      return this.subscribers.has(subscriber);
    }
    return false;
  }
  
  getSubscriberCount(eventType: string): number {
    const eventSubscribers = this.activeSubscriptions.get(eventType);
    return eventSubscribers ? eventSubscribers.size : 0;
  }
  
  getEventTypes(): string[] {
    return Array.from(this.activeSubscriptions.keys());
  }
}

// 사용 예시
const subManager = new EventSubscriptionManager();
const listener1 = { name: 'Listener1' };
const listener2 = { name: 'Listener2' };

subManager.subscribe(listener1, 'click');
subManager.subscribe(listener2, 'click');
subManager.subscribe(listener1, 'hover');

console.log(subManager.isSubscriber(listener1)); // true
console.log(subManager.getSubscriberCount('click')); // 2
console.log(subManager.getEventTypes()); // ['click', 'hover']

subManager.unsubscribe(listener1, 'click');
console.log(subManager.getSubscriberCount('click')); // 1
```

컬렉션 타입 분석과 메모리 관리:

```typescript
// 컬렉션 분석기
function analyzeCollectionType(collection: unknown) {
  const analysis = {
    type: 'unknown',
    isWeak: false,
    canIterate: false,
    hasSize: false,
    supportsArbitraryKeys: false,
    memoryCharacteristics: 'standard'
  };
  
  if (isWeakSet(collection)) {
    analysis.type = 'WeakSet';
    analysis.isWeak = true;
    analysis.canIterate = false;
    analysis.hasSize = false;
    analysis.supportsArbitraryKeys = false; // 객체만 가능
    analysis.memoryCharacteristics = 'weak-reference';
  } else if (collection instanceof Set) {
    analysis.type = 'Set';
    analysis.isWeak = false;
    analysis.canIterate = true;
    analysis.hasSize = true;
    analysis.supportsArbitraryKeys = true;
    analysis.memoryCharacteristics = 'strong-reference';
  } else if (collection instanceof WeakMap) {
    analysis.type = 'WeakMap';
    analysis.isWeak = true;
    analysis.canIterate = false;
    analysis.hasSize = false;
    analysis.supportsArbitraryKeys = false;
    analysis.memoryCharacteristics = 'weak-reference';
  } else if (collection instanceof Map) {
    analysis.type = 'Map';
    analysis.isWeak = false;
    analysis.canIterate = true;
    analysis.hasSize = true;
    analysis.supportsArbitraryKeys = true;
    analysis.memoryCharacteristics = 'strong-reference';
  }
  
  return analysis;
}

// 사용 예시
console.log(analyzeCollectionType(new WeakSet()));
// {
//   type: 'WeakSet',
//   isWeak: true,
//   canIterate: false,
//   hasSize: false,
//   supportsArbitraryKeys: false,
//   memoryCharacteristics: 'weak-reference'
// }

console.log(analyzeCollectionType(new Set()));
// {
//   type: 'Set',
//   isWeak: false,
//   canIterate: true,
//   hasSize: true,
//   supportsArbitraryKeys: true,
//   memoryCharacteristics: 'strong-reference'
// }

// 메모리 안전한 오브젝트 풀
class ObjectPool<T extends object> {
  private pool: T[] = [];
  private inUse: unknown;
  
  constructor(private factory: () => T, private reset: (obj: T) => void) {
    this.inUse = new WeakSet<T>();
  }
  
  acquire(): T {
    let obj = this.pool.pop();
    
    if (!obj) {
      obj = this.factory();
    }
    
    if (isWeakSet(this.inUse)) {
      this.inUse.add(obj);
    }
    
    return obj;
  }
  
  release(obj: T): boolean {
    if (!isWeakSet(this.inUse) || !this.inUse.has(obj)) {
      return false; // 풀에서 생성되지 않은 객체
    }
    
    this.reset(obj);
    this.pool.push(obj);
    this.inUse.delete(obj);
    return true;
  }
  
  isInUse(obj: T): boolean {
    if (isWeakSet(this.inUse)) {
      return this.inUse.has(obj);
    }
    return false;
  }
  
  getPoolSize(): number {
    return this.pool.length;
  }
}

// 사용 예시
interface TaskObject {
  id: number;
  data: any;
  status: string;
}

const taskPool = new ObjectPool<TaskObject>(
  () => ({ id: 0, data: null, status: 'idle' }),
  (task) => {
    task.id = 0;
    task.data = null;
    task.status = 'idle';
  }
);

const task1 = taskPool.acquire();
task1.id = 1;
task1.data = { message: 'Hello' };
task1.status = 'active';

console.log(taskPool.isInUse(task1)); // true
console.log(taskPool.getPoolSize()); // 0

taskPool.release(task1);
console.log(taskPool.isInUse(task1)); // false  
console.log(taskPool.getPoolSize()); // 1
```

#### 파라미터

- `value` (`unknown`): WeakSet 인스턴스인지 확인할 값이에요.

#### 반환 값

(`value is WeakSet<WeakKey>`): 값이 WeakSet 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
