# 🔒 es-toolkit 보안 취약점 감사 보고서

## 요약

es-toolkit 프로젝트에 대한 종합적인 보안 감사를 수행한 결과, 몇 가지 심각한 보안 취약점을 발견했습니다. 대부분의 유틸리티 함수들은 안전하게 구현되어 있으나, lodash 호환성을 위한 `compat` 레이어에서 주요 취약점들이 확인되었습니다.

## 🚨 심각도별 취약점 분류

### 1. **CRITICAL - 즉시 수정 필요**

#### 1.1 Remote Code Execution (RCE) - template 함수
- **위치**: `/src/compat/string/template.ts`
- **취약점**: `new Function()`을 사용한 동적 코드 실행
- **영향**: 공격자가 임의의 JavaScript 코드를 실행할 수 있음
- **공격 예시**:
```javascript
const malicious = template('<% process.mainModule.require("child_process").execSync("rm -rf /") %>');
malicious({}); // 시스템 명령어 실행
```

#### 1.2 Prototype Pollution
- **위치**: `/src/compat/object/` (merge, assignIn, set, updateWith)
- **취약점**: `__proto__`, `constructor`, `prototype` 속성에 대한 검증 부재
- **영향**: 전역 Object.prototype 오염으로 애플리케이션 전체에 영향
- **공격 예시**:
```javascript
merge({}, JSON.parse('{"__proto__": {"isAdmin": true}}'));
// 이제 모든 객체가 isAdmin: true 속성을 가짐
```

### 2. **HIGH - 높은 우선순위로 수정**

#### 2.1 Stack Overflow - 순환 참조 처리 미흡
- **위치**: `/src/compat/object/merge.ts`, `/src/object/merge.ts`
- **취약점**: 순환 참조 객체 병합 시 무한 재귀
- **영향**: 서비스 거부(DoS) 공격 가능

#### 2.2 XSS 위험 - 불완전한 이스케이프
- **위치**: template 함수의 `<%= %>` delimiter
- **취약점**: HTML 이스케이프 없이 직접 출력
- **영향**: 저장형/반사형 XSS 공격 가능

### 3. **MEDIUM - 중간 우선순위**

#### 3.1 ReDoS 위험
- **위치**: `/src/compat/predicate/isNative.ts`, `/src/compat/string/truncate.ts`
- **취약점**: 복잡한 정규식 패턴
- **영향**: CPU 자원 고갈로 인한 DoS

#### 3.2 경로 탐색(Path Traversal)
- **위치**: `/src/compat/util/toPath.ts`
- **취약점**: 상위 디렉토리 접근(`../`) 검증 없음
- **영향**: 의도하지 않은 객체 속성 접근

### 4. **LOW - 낮은 우선순위**

#### 4.1 불안전한 타입 변환
- **위치**: valueOf, toString 메서드 호출 부분
- **취약점**: 재정의된 메서드로 인한 부작용
- **영향**: 예상치 못한 동작

## ✅ 안전한 부분들

1. **기본 문자열 처리 함수들**: escape, unescape (template 제외)
2. **배열 유틸리티**: chunk, difference, union 등
3. **함수 유틸리티**: debounce, throttle, memoize
4. **정규식 처리**: escapeRegExp 완벽히 구현
5. **DOM 관련**: 최소한의 DOM 조작으로 XSS 위험 낮음

## 🛡️ 권장 보안 조치

### 1. **긴급 조치사항**

```javascript
// 1. Prototype Pollution 방어
const FORBIDDEN_KEYS = ['__proto__', 'constructor', 'prototype'];

function isSafeKey(key: string): boolean {
  return !FORBIDDEN_KEYS.includes(key);
}

// 2. template 함수 대체
// new Function() 사용 금지, 안전한 템플릿 엔진으로 교체
```

### 2. **중기 개선사항**

1. **순환 참조 처리**:
```javascript
function mergeWithCircularCheck(target: any, source: any, seen = new WeakMap()) {
  if (seen.has(source)) return seen.get(source);
  seen.set(source, {});
  // ... merge logic
}
```

2. **재귀 깊이 제한**:
```javascript
const MAX_DEPTH = 1000;
function safeDeepOperation(obj: any, depth = 0) {
  if (depth > MAX_DEPTH) throw new Error('Maximum depth exceeded');
  // ... operation logic
}
```

3. **보안 옵션 추가**:
```javascript
interface SecureOptions {
  allowPrototype?: boolean;
  maxDepth?: number;
  sanitizeHtml?: boolean;
}
```

### 3. **문서화 및 경고**

1. 각 위험 함수에 보안 경고 추가
2. 안전한 사용 예시 제공
3. CSP(Content Security Policy) 설정 가이드

### 4. **테스트 추가**

```javascript
// 보안 테스트 예시
describe('Security Tests', () => {
  it('should prevent prototype pollution', () => {
    const obj = {};
    merge(obj, JSON.parse('{"__proto__": {"polluted": true}}'));
    expect({}.polluted).toBeUndefined();
  });
  
  it('should handle circular references', () => {
    const circular = { a: 1 };
    circular.self = circular;
    expect(() => merge({}, circular)).not.toThrow();
  });
});
```

## 📋 우선순위별 액션 플랜

1. **즉시 (1주 이내)**:
   - template 함수 사용 중단 권고 또는 재설계
   - Prototype Pollution 패치 배포

2. **단기 (1개월 이내)**:
   - 순환 참조 처리 개선
   - ReDoS 취약점 수정
   - 보안 테스트 스위트 추가

3. **중기 (3개월 이내)**:
   - 전체 compat 레이어 보안 검토
   - 보안 가이드라인 문서 작성
   - 정기적인 보안 감사 프로세스 수립

## 결론

es-toolkit은 전반적으로 잘 설계된 유틸리티 라이브러리이지만, lodash와의 100% 호환성을 유지하려는 과정에서 몇 가지 심각한 보안 취약점이 도입되었습니다. 특히 `template` 함수와 Prototype Pollution 취약점은 즉각적인 조치가 필요합니다.

보안이 중요한 프로덕션 환경에서는 `compat` 레이어 대신 es-toolkit의 기본 함수들을 사용할 것을 강력히 권장합니다.