# isUndefined

주어진 값이 undefined인지 확인해요.

```typescript
const result = isUndefined(value);
```

## 레퍼런스

### `isUndefined(value)`

값이 undefined인지 확인하고 싶을 때 `isUndefined`를 사용하세요. 변수의 초기화 여부나 선택적 프로퍼티의 존재 여부를 확인할 때 유용해요.

```typescript
import { isUndefined } from 'es-toolkit/predicate';

// undefined 값들
console.log(isUndefined(undefined)); // true
console.log(isUndefined(void 0)); // true

let uninitialized: string;
console.log(isUndefined(uninitialized)); // true

// undefined가 아닌 값들
console.log(isUndefined(null)); // false
console.log(isUndefined('')); // false
console.log(isUndefined(0)); // false
console.log(isUndefined(false)); // false
console.log(isUndefined({})); // false
console.log(isUndefined([])); // false
```

변수 초기화와 기본값 설정에 유용해요:

```typescript
// 안전한 기본값 설정
function setDefaultValue<T>(value: T | undefined, defaultValue: T): T {
  if (isUndefined(value)) {
    // TypeScript가 value를 undefined로 추론
    return defaultValue;
  }
  
  return value;
}

// 사용 예시
const name = setDefaultValue(undefined, 'Anonymous');
const age = setDefaultValue(25, 30); // 25가 undefined가 아니므로 25 반환
const city = setDefaultValue(undefined, 'Seoul');

console.log(name); // 'Anonymous'
console.log(age); // 25
console.log(city); // 'Seoul'

// 설정 객체 병합
function mergeConfig(userConfig: Record<string, unknown>, defaultConfig: Record<string, unknown>) {
  const merged: Record<string, unknown> = { ...defaultConfig };
  
  for (const [key, value] of Object.entries(userConfig)) {
    if (!isUndefined(value)) {
      merged[key] = value;
    }
  }
  
  return merged;
}

// 사용 예시
const defaultConfig = {
  theme: 'light',
  timeout: 5000,
  retries: 3
};

const userConfig = {
  theme: 'dark',
  timeout: undefined, // 기본값 사용
  retries: 5
};

const finalConfig = mergeConfig(userConfig, defaultConfig);
console.log(finalConfig); // { theme: 'dark', timeout: 5000, retries: 5 }
```

선택적 프로퍼티와 함수 파라미터 처리:

```typescript
// 선택적 프로퍼티 검증
interface UserProfile {
  name: string;
  email?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
  };
}

function validateProfile(profile: UserProfile): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (isUndefined(profile.email)) {
    errors.push('이메일이 설정되지 않았습니다');
  }
  
  if (isUndefined(profile.phone)) {
    errors.push('전화번호가 설정되지 않았습니다');
  }
  
  if (isUndefined(profile.address)) {
    errors.push('주소가 설정되지 않았습니다');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// 사용 예시
const profile1: UserProfile = { name: 'John', email: 'john@example.com' };
const profile2: UserProfile = { name: 'Jane', email: 'jane@example.com', phone: '123-456' };

console.log(validateProfile(profile1));
// { isValid: false, errors: ['전화번호가 설정되지 않았습니다', '주소가 설정되지 않았습니다'] }

// 가변 인수 함수
function createLogger(level: 'info' | 'warn' | 'error', prefix?: string, suffix?: string) {
  const actualPrefix = isUndefined(prefix) ? '[LOG]' : prefix;
  const actualSuffix = isUndefined(suffix) ? '' : suffix;
  
  return function(message: string) {
    console.log(`${actualPrefix} ${message} ${actualSuffix}`.trim());
  };
}

// 사용 예시
const basicLogger = createLogger('info');
const prefixLogger = createLogger('warn', '[WARNING]');
const fullLogger = createLogger('error', '[ERROR]', ' - Check logs');

basicLogger('서버 시작'); // [LOG] 서버 시작
prefixLogger('메모리 부족'); // [WARNING] 메모리 부족
fullLogger('연결 실패'); // [ERROR] 연결 실패 - Check logs
```

API 응답과 데이터 처리에서 활용:

```typescript
// API 응답 처리
interface ApiResponse {
  data?: any;
  error?: string;
  metadata?: {
    total?: number;
    page?: number;
  };
}

function processApiResponse(response: ApiResponse) {
  const result = {
    hasData: !isUndefined(response.data),
    hasError: !isUndefined(response.error),
    pagination: {
      total: isUndefined(response.metadata?.total) ? 0 : response.metadata.total,
      page: isUndefined(response.metadata?.page) ? 1 : response.metadata.page
    }
  };
  
  if (isUndefined(response.data) && isUndefined(response.error)) {
    return { ...result, status: 'empty' };
  }
  
  if (!isUndefined(response.error)) {
    return { ...result, status: 'error', message: response.error };
  }
  
  return { ...result, status: 'success', payload: response.data };
}

// 사용 예시
const response1: ApiResponse = { data: [1, 2, 3] };
const response2: ApiResponse = { error: '서버 에러' };
const response3: ApiResponse = { data: [], metadata: { total: 100, page: 2 } };

console.log(processApiResponse(response1));
// { hasData: true, hasError: false, pagination: { total: 0, page: 1 }, status: 'success', payload: [1, 2, 3] }

console.log(processApiResponse(response2));
// { hasData: false, hasError: true, pagination: { total: 0, page: 1 }, status: 'error', message: '서버 에러' }

// 중첩 객체 안전한 접근
function safeGet<T>(obj: any, path: string, defaultValue?: T): T | undefined {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || isUndefined(current) || isUndefined(current[key])) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current;
}

// 사용 예시
const data = {
  user: {
    profile: {
      name: 'John',
      settings: {
        theme: 'dark'
      }
    }
  }
};

console.log(safeGet(data, 'user.profile.name')); // 'John'
console.log(safeGet(data, 'user.profile.age', 25)); // 25 (기본값)
console.log(safeGet(data, 'user.missing.prop', 'default')); // 'default'
```

캐시와 메모이제이션에서 사용:

```typescript
// 메모이제이션 캐시
class MemoCache<T> {
  private cache = new Map<string, T>();
  
  get(key: string): T | undefined {
    const value = this.cache.get(key);
    
    if (isUndefined(value)) {
      return undefined;
    }
    
    return value;
  }
  
  set(key: string, value: T): void {
    if (!isUndefined(value)) {
      this.cache.set(key, value);
    }
  }
  
  has(key: string): boolean {
    return this.cache.has(key) && !isUndefined(this.cache.get(key));
  }
  
  getOrCompute(key: string, computer: () => T): T {
    const cached = this.get(key);
    
    if (!isUndefined(cached)) {
      return cached;
    }
    
    const computed = computer();
    this.set(key, computed);
    return computed;
  }
}

// 사용 예시
const cache = new MemoCache<number>();

function expensiveCalculation(n: number): number {
  console.log(`계산 중: ${n}`);
  return n * n;
}

// 캐시 활용
console.log(cache.getOrCompute('calc_5', () => expensiveCalculation(5))); // 계산 중: 5, 25
console.log(cache.getOrCompute('calc_5', () => expensiveCalculation(5))); // 25 (캐시에서 반환)

// 설정 관리 시스템
class ConfigManager {
  private config = new Map<string, any>();
  
  set(key: string, value: unknown): void {
    if (!isUndefined(value)) {
      this.config.set(key, value);
    }
  }
  
  get<T>(key: string): T | undefined;
  get<T>(key: string, defaultValue: T): T;
  get<T>(key: string, defaultValue?: T): T | undefined {
    const value = this.config.get(key);
    
    if (isUndefined(value)) {
      return defaultValue;
    }
    
    return value as T;
  }
  
  getRequired<T>(key: string): T {
    const value = this.config.get(key);
    
    if (isUndefined(value)) {
      throw new Error(`필수 설정 '${key}'이 정의되지 않았습니다`);
    }
    
    return value as T;
  }
}

// 사용 예시
const config = new ConfigManager();

config.set('database.host', 'localhost');
config.set('database.port', 5432);
config.set('cache.ttl', undefined); // 설정하지 않음

console.log(config.get<string>('database.host')); // 'localhost'
console.log(config.get<number>('cache.ttl', 3600)); // 3600 (기본값)

try {
  console.log(config.getRequired<string>('missing.key'));
} catch (error) {
  console.log(error.message); // 필수 설정 'missing.key'이 정의되지 않았습니다
}
```

#### 파라미터

- `value` (`unknown`): undefined인지 확인할 값이에요.

#### 반환 값

(`value is undefined`): 값이 undefined이면 `true`, 그렇지 않으면 `false`를 반환해요.
