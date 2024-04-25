# delay

코드의 실행을 주어진 밀리세컨드만큼 지연시켜요.

이 함수는 특정한 시간 이후에 Resolve되는 Promise를 반환해요. async/await 함수를 사용하는 경우에 함수의 실행을 잠깐 일시정지시킬 수 있어요.

## 인터페이스

```typescript
function delay(ms: number): Promise<void>;
```

### 파라미터 

- `ms` (`number`): 코드 실행을 지연시킬 밀리세컨드.

### 반환 값

(`Promise<void>`): 정해진 지연시간 이후에 Resolve될 Promise.

## 예시

```typescript
async function foo() {
  console.log('시작');
  await delay(1000); // 코드 실행을 1초동안 지연
  console.log('끝');
}

foo();
```
