// es-toolkit 보안 취약점 PoC (Proof of Concept)
// ⚠️ 경고: 이 코드는 교육 목적으로만 사용하세요

console.log('=== es-toolkit Security PoC ===\n');

// 1. Template 함수 RCE (Remote Code Execution) 테스트
console.log('1. Template RCE 취약점 테스트:');
try {
  const { template } = require('./dist/compat/string/template.js');
  
  // 위험한 템플릿 - process 객체 접근
  const dangerousTemplate = template('<%= process.versions %>');
  console.log('- process 정보 노출:', dangerousTemplate({}));
  
  // 위험한 템플릿 - 코드 실행
  const codeExecTemplate = template('<% console.log("코드가 실행되었습니다!") %>');
  codeExecTemplate({});
  
} catch (e) {
  console.log('- Template 테스트 실패:', e.message);
}

// 2. Prototype Pollution 테스트
console.log('\n2. Prototype Pollution 취약점 테스트:');
try {
  const { merge } = require('./dist/compat/object/merge.js');
  
  // 테스트 전 상태
  console.log('- 공격 전 {}.isAdmin:', {}.isAdmin); // undefined
  
  // Prototype Pollution 공격
  const maliciousPayload = JSON.parse('{"__proto__": {"isAdmin": true}}');
  const result = merge({}, maliciousPayload);
  
  // 테스트 후 상태
  console.log('- 공격 후 {}.isAdmin:', {}.isAdmin); // true가 되면 취약
  console.log('- 새 객체의 isAdmin:', {}.isAdmin); // 모든 객체가 영향받음
  
} catch (e) {
  console.log('- Prototype Pollution 테스트 실패:', e.message);
}

// 3. 순환 참조로 인한 Stack Overflow 테스트
console.log('\n3. 순환 참조 Stack Overflow 테스트:');
try {
  const { merge } = require('./dist/object/merge.js');
  
  // 순환 참조 객체 생성
  const circular1 = { name: 'obj1' };
  const circular2 = { name: 'obj2', ref: circular1 };
  circular1.ref = circular2;
  
  console.log('- 순환 참조 객체 병합 시도...');
  const merged = merge({}, circular1);
  console.log('- 성공: 순환 참조가 안전하게 처리됨');
  
} catch (e) {
  console.log('- 실패: Stack Overflow 발생!', e.message);
}

// 4. ReDoS 테스트
console.log('\n4. ReDoS (정규식 서비스 거부) 테스트:');
try {
  const { words } = require('./dist/string/words.js');
  
  // ReDoS 유발 패턴
  const maliciousInput = 'A'.repeat(50) + 'a'.repeat(50);
  console.log('- 악의적인 입력 길이:', maliciousInput.length);
  
  const start = Date.now();
  const result = words(maliciousInput);
  const elapsed = Date.now() - start;
  
  console.log(`- 처리 시간: ${elapsed}ms`);
  console.log(`- ReDoS ${elapsed > 1000 ? '취약!' : '안전'}`);
  
} catch (e) {
  console.log('- ReDoS 테스트 실패:', e.message);
}

// 5. XSS 테스트 (escape 함수)
console.log('\n5. XSS 방어 테스트:');
try {
  const { escape, template } = require('./dist/compat/string/index.js');
  
  const xssPayload = '<script>alert("XSS")</script>';
  
  // escape 함수 테스트
  console.log('- escape 결과:', escape(xssPayload));
  
  // template 함수의 안전하지 않은 사용
  const unsafeTemplate = template('<%= data %>');
  console.log('- 안전하지 않은 템플릿:', unsafeTemplate({ data: xssPayload }));
  
  // template 함수의 안전한 사용
  const safeTemplate = template('<%- data %>');
  console.log('- 안전한 템플릿:', safeTemplate({ data: xssPayload }));
  
} catch (e) {
  console.log('- XSS 테스트 실패:', e.message);
}

console.log('\n=== 테스트 완료 ===');