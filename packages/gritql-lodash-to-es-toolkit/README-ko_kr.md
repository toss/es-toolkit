# @es-toolkit/gritql-lodash-to-es-toolkit

🔧 **lodash에서 es-toolkit/compat으로 마이그레이션하는 GritQL 패턴**

이 패키지는 lodash import문을 es-toolkit/compat import문으로 자동 변환하는 [GritQL](https://docs.grit.io/) 패턴을 제공합니다. GritQL은 소스코드를 검색하고 수정하는 강력한 쿼리 언어로, 기존 codemod들에 비해 뛰어난 성능과 조합성을 제공합니다.

## 📖 단계별 가이드

### 1. Grit CLI 설치

```bash
curl -fsSL https://docs.grit.io/install | bash
```

자세한 내용은 [grit 문서](https://docs.grit.io/cli/quickstart#installation)를 확인하세요.

### 2. 프로젝트에서 Grit 초기화

```bash
cd your-project
grit init
```

### 3. GitHub에서 패턴 다운로드

```bash
# GitHub에서 최신 패턴을 직접 다운로드
curl -fsSL https://raw.githubusercontent.com/toss/es-toolkit/main/packages/gritql-lodash-to-es-toolkit/.grit/grit.yaml -o .grit/grit.yaml
```

### 4. 변환 실행

**변경사항 미리보기 (권장):**

```bash
grit apply --dry-run
```

**모든 패턴 적용:**

```bash
grit apply
```

**특정 패턴만 적용:**

```bash
# 기본 import만 변환
grit apply lodash_default_import_to_es_toolkit_compat

# named import만 변환
grit apply lodash_named_imports_to_es_toolkit_compat

# 개별 함수 import만 변환
grit apply lodash_individual_imports_to_es_toolkit_compat
```

## 🔍 변환 예시

### 변환 전:

```javascript
import _ from 'lodash';
import {
    map,
    filter
} from 'lodash';
import debounce from 'lodash/debounce';
import {
    chunk
} from 'lodash-es';
```

### 변환 후:

```javascript
import * as _ from 'es-toolkit/compat';
import {
    map,
    filter
} from 'es-toolkit/compat';
import {
    debounce
} from 'es-toolkit/compat';
import {
    chunk
} from 'es-toolkit/compat';
```

## 🎯 패턴 상세 정보

| 패턴 이름 | 변환 내용 |
|-----------|-----------|
| `lodash_default_import_to_es_toolkit_compat` | `import _ from 'lodash'` → `import * as _ from 'es-toolkit/compat'` |
| `lodash_named_imports_to_es_toolkit_compat` | `import { map } from 'lodash'` → `import { map } from 'es-toolkit/compat'` |
| `lodash_individual_imports_to_es_toolkit_compat` | `import debounce from 'lodash/debounce'` → `import { debounce } from 'es-toolkit/compat'` |
| `lodash_individual_imports_aliased_to_es_toolkit_compat` | `import myDebounce from 'lodash/debounce'` → `import { debounce as myDebounce } from 'es-toolkit/compat'` |
| `lodash_es_imports_to_es_toolkit_compat` | `import { map } from 'lodash-es'` → `import { map } from 'es-toolkit/compat'` |

## 📚 더 알아보기

* [GritQL 문서](https://docs.grit.io/)
* [es-toolkit 문서](https://es-toolkit.slash.page/)
* [마이그레이션 가이드](https://es-toolkit.slash.page/docs/migration)
