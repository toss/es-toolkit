# isMap

값이 Map인지 확인해요.

```typescript
const result = isMap(value);
```

## 레퍼런스

### `isMap(value)`

값이 Map 인스턴스인지 확인하고 싶을 때 `isMap`을 사용하세요. `instanceof` 연산자를 사용해서 `Map`인지 검사해요.

```typescript
import { isMap } from 'es-toolkit/predicate';

// Map 인스턴스
const map = new Map([['key', 'value']]);
console.log(isMap(map)); // true

// Map이 아닌 값들
console.log(isMap(new Set())); // false
console.log(isMap(new WeakMap())); // false
console.log(isMap({})); // false
console.log(isMap([])); // false
console.log(isMap(null)); // false
```

TypeScript에서 타입 가드로도 사용할 수 있어요.

```typescript
function processValue(value: unknown) {
  if (isMap(value)) {
    // 이제 value는 Map<any, any> 타입으로 좁혀져요
    console.log(value.size);
    value.set('new-key', 'new-value');
  }
}
```

#### 파라미터

- `value` (`unknown`): `Map`인지 확인할 값이에요.

#### 반환 값

(`value is Map<any, any>`): 값이 Map이면 `true`, 그렇지 않으면 `false`를 반환해요.
