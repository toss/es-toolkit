# 🚨 es-toolkit 보안 취약점 요약

## 발견된 주요 취약점

### 🔴 CRITICAL (즉시 수정 필요)
| 취약점 | 위치 | 영향 | 위험도 |
|--------|------|------|--------|
| **Remote Code Execution** | `/src/compat/string/template.ts` | 임의 코드 실행 가능 | 🔴🔴🔴🔴🔴 |
| **Prototype Pollution** | `/src/compat/object/merge.ts`, `set.ts`, `assignIn.ts` | 전역 객체 오염 | 🔴🔴🔴🔴🔴 |

### 🟠 HIGH
| 취약점 | 위치 | 영향 | 위험도 |
|--------|------|------|--------|
| **Stack Overflow** | 순환 참조 처리 함수들 | 서비스 거부(DoS) | 🟠🟠🟠🟠 |
| **XSS 위험** | template의 `<%= %>` | 스크립트 삽입 | 🟠🟠🟠🟠 |

### 🟡 MEDIUM
| 취약점 | 위치 | 영향 | 위험도 |
|--------|------|------|--------|
| **ReDoS** | 복잡한 정규식 사용 부분 | CPU 자원 고갈 | 🟡🟡🟡 |
| **Path Traversal** | `toPath.ts` | 의도하지 않은 접근 | 🟡🟡🟡 |

## 빠른 수정 가이드

### 1. Template 함수 보안 강화
```javascript
// ❌ 위험한 사용
template('<%= userInput %>') // XSS 취약
template('<% eval(code) %>') // RCE 취약

// ✅ 안전한 사용
template('<%- userInput %>') // HTML 이스케이프
// 또는 template 함수 사용 자제
```

### 2. Prototype Pollution 방어
```javascript
// 보호 코드 추가
const FORBIDDEN_KEYS = ['__proto__', 'constructor', 'prototype'];

function safeMerge(target, source) {
  for (const key in source) {
    if (FORBIDDEN_KEYS.includes(key)) continue;
    target[key] = source[key];
  }
}
```

### 3. 순환 참조 처리
```javascript
function mergeWithCircularCheck(target, source, seen = new WeakSet()) {
  if (seen.has(source)) return target;
  seen.add(source);
  // ... merge logic
}
```

## 권장 조치

1. **보안 패치 우선순위**
   - 🔴 CRITICAL: 24시간 이내
   - 🟠 HIGH: 1주일 이내
   - 🟡 MEDIUM: 1개월 이내

2. **사용자 공지사항**
   - template 함수 사용 자제 권고
   - compat 레이어의 보안 위험 안내
   - 안전한 대안 제시

3. **장기 개선사항**
   - 정기적인 보안 감사
   - 자동화된 보안 테스트
   - 보안 가이드라인 문서화