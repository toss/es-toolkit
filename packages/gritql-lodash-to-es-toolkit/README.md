# @es-toolkit/gritql-lodash-to-es-toolkit

🔧 **GritQL patterns for migrating from lodash to es-toolkit/compat**

This package provides [GritQL](https://docs.grit.io/) patterns to automatically transform lodash import statements to es-toolkit/compat imports. GritQL is a powerful query language for searching and modifying source code, offering superior performance and composability compared to traditional codemods.

## 📖 Step-by-Step Guide

### 1. Install Grit CLI

```bash
curl -fsSL https://docs.grit.io/install | bash
```

Check [grit docs](https://docs.grit.io/cli/quickstart#installation)

### 2. Initialize Grit in your project

```bash
cd your-project
grit init
```

### 3. Download patterns from GitHub

```bash
# Download the latest patterns directly from GitHub
curl -fsSL https://raw.githubusercontent.com/toss/es-toolkit/main/packages/gritql-lodash-to-es-toolkit/.grit/grit.yaml -o .grit/grit.yaml
```

### 4. Run transformations

**Preview changes (recommended first):**

```bash
grit apply --dry-run
```

**Apply all patterns:**

```bash
grit apply
```

**Apply specific patterns:**

```bash
# Default imports only
grit apply lodash_default_import_to_es_toolkit_compat

# Named imports only
grit apply lodash_named_imports_to_es_toolkit_compat

# Individual imports only
grit apply lodash_individual_imports_to_es_toolkit_compat
```

## 🔍 Examples

### Before transformation:

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

### After transformation:

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

## 🎯 Pattern Details

| Pattern Name | Transforms |
|--------------|------------|
| `lodash_default_import_to_es_toolkit_compat` | `import _ from 'lodash'` → `import * as _ from 'es-toolkit/compat'` |
| `lodash_named_imports_to_es_toolkit_compat` | `import { map } from 'lodash'` → `import { map } from 'es-toolkit/compat'` |
| `lodash_individual_imports_to_es_toolkit_compat` | `import debounce from 'lodash/debounce'` → `import { debounce } from 'es-toolkit/compat'` |
| `lodash_individual_imports_aliased_to_es_toolkit_compat` | `import myDebounce from 'lodash/debounce'` → `import { debounce as myDebounce } from 'es-toolkit/compat'` |
| `lodash_es_imports_to_es_toolkit_compat` | `import { map } from 'lodash-es'` → `import { map } from 'es-toolkit/compat'` |

## 📚 Learn More

* [GritQL Documentation](https://docs.grit.io/)
* [es-toolkit Documentation](https://es-toolkit.slash.page/)
* [Migration Guide](https://es-toolkit.slash.page/docs/migration) 
