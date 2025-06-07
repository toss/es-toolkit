# @es-toolkit/codemod-lodash-to-es-toolkit

🔧 **lodash에서 es-toolkit/compat으로 자동 마이그레이션하는 codemod**

이 codemod는 lodash import문을 es-toolkit/compat import문으로 자동 변환해주는 도구입니다. AST(Abstract Syntax Tree)를 기반으로 안전하고 정확한 변환을 제공합니다.

## ✨ 주요 기능

* 🎯 **모든 lodash 패턴 지원**: 다양한 lodash import 스타일을 완벽 지원
* 📝 **Quote 스타일 보존**: 원본 코드의 따옴표 스타일을 자동으로 감지하고 유지
* 🔒 **안전한 변환**: AST 기반으로 정확하고 안전한 코드 변환
* ⚡ **빠른 처리**: 대규모 코드베이스도 빠르게 처리

## 🚀 빠른 시작

```bash
# npm을 사용하는 경우
npx @es-toolkit/codemod-lodash-to-es-toolkit src/

# yarn을 사용하는 경우  
yarn dlx @es-toolkit/codemod-lodash-to-es-toolkit src/

# 미리보기 모드 (변경사항을 적용하지 않고 확인만)
npx @es-toolkit/codemod-lodash-to-es-toolkit src/ --dry
```

## 📋 지원하는 변환

### 1. Default Import

```javascript
// Before
import _ from 'lodash';

// After  
import * as _ from 'es-toolkit/compat';
```

### 2. Named Import

```javascript
// Before
import {
    map,
    filter,
    reduce
} from 'lodash';

// After
import {
    map,
    filter,
    reduce
} from 'es-toolkit/compat';
```

### 3. Individual Function Import

```javascript
// Before
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// After
import {
    debounce
} from 'es-toolkit/compat';
import {
    throttle
} from 'es-toolkit/compat';
```

### 4. Aliased Import

```javascript
// Before
import myDebounce from 'lodash/debounce';

// After  
import {
    debounce as myDebounce
} from 'es-toolkit/compat';
```

### 5. lodash-es Import

```javascript
// Before
import {
    map,
    filter
} from 'lodash-es';

// After
import {
    map,
    filter
} from 'es-toolkit/compat';
```

### 6. lodash/fp Import

```javascript
// Before
import {
    pipe,
    map
} from 'lodash/fp';

// After
import {
    pipe,
    map
} from 'es-toolkit/compat';
```

### 7. Quote Style Preservation

```javascript
// Single quotes preserved
import _ from 'lodash';
// ↓
import * as _ from 'es-toolkit/compat';

// Double quotes preserved
import _ from "lodash";
// ↓
import * as _ from "es-toolkit/compat";
```

## 🎯 사용법

### 기본 사용법

```bash
npx @es-toolkit/codemod-lodash-to-es-toolkit <path>
```

### 옵션

| 옵션 | 설명 | 예시 |
|------|------|------|
| `<path>` | 변환할 파일 또는 디렉토리 경로 | `src/` , `components/` |
| `--dry` | 미리보기 모드 (변경 적용 안함) | `--dry` |
| `--help` , `-h` | 도움말 표시 | `--help` |

### 사용 예시

```bash
# 전체 src 디렉토리 변환
npx @es-toolkit/codemod-lodash-to-es-toolkit src/

# 특정 파일만 변환
npx @es-toolkit/codemod-lodash-to-es-toolkit src/utils/helpers.ts

# 미리보기 모드로 변경사항 확인
npx @es-toolkit/codemod-lodash-to-es-toolkit src/ --dry

# components 디렉토리만 변환
npx @es-toolkit/codemod-lodash-to-es-toolkit src/components/
```

## ⚠️ 주의사항

1. **백업 필수**: 중요한 코드베이스에서 사용하기 전에 반드시 백업을 만드세요.
2. **미리보기 확인**: `--dry` 옵션으로 변경사항을 먼저 확인하세요.
3. **테스트 실행**: 변환 후에는 반드시 테스트를 실행하여 동작을 확인하세요.
4. **compat 모드**: es-toolkit/compat은 lodash와 100% 호환되는 API를 제공합니다.

## 🔗 관련 링크

* [es-toolkit 공식 문서](https://es-toolkit.slash.page)
* [es-toolkit GitHub](https://github.com/toss/es-toolkit)

## 📄 라이선스

MIT License - [LICENSE](../../LICENSE) 파일을 참고하세요. 
