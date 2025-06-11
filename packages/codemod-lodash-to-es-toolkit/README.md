# @es-toolkit/codemod-lodash-to-es-toolkit

🔧 **Automatic migration codemod from lodash to es-toolkit/compat**

This codemod automatically transforms lodash import statements to es-toolkit/compat import statements. It provides safe and accurate transformations based on AST (Abstract Syntax Tree).

## ✨ Key Features

* 🎯 **Supports all lodash patterns**: Perfect support for various lodash import styles
* 📝 **Quote style preservation**: Automatically detects and maintains the quote style of the original code
* 🔒 **Safe transformation**: Accurate and safe code transformation based on AST
* ⚡ **Fast processing**: Quickly processes even large codebases

## 🚀 Quick Start

```bash
# Using npm
npx @es-toolkit/codemod-lodash-to-es-toolkit src/

# Using yarn  
yarn dlx @es-toolkit/codemod-lodash-to-es-toolkit src/

# Preview mode (check changes without applying them)
npx @es-toolkit/codemod-lodash-to-es-toolkit src/ --dry
```

## 📋 Supported transformations

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

## 🎯 Usage

### Basic Usage

```bash
npx @es-toolkit/codemod-lodash-to-es-toolkit <path>
```

### Options

| Option | Description | Example |
|------|------|------|
| `<path>` | File or directory path to transform | `src/` , `components/` |
| `--dry` | Preview mode (don't apply changes) | `--dry` |
| `--help` , `-h` | Show help | `--help` |

### Usage Examples

```bash
# Transform entire src directory
npx @es-toolkit/codemod-lodash-to-es-toolkit src/

# Transform specific file only
npx @es-toolkit/codemod-lodash-to-es-toolkit src/utils/helpers.ts

# Check changes in preview mode
npx @es-toolkit/codemod-lodash-to-es-toolkit src/ --dry

# Transform components directory only
npx @es-toolkit/codemod-lodash-to-es-toolkit src/components/
```

## ⚠️ Important Notes

1. **Backup Required**: Always create a backup before using on important codebases.
2. **Preview Check**: Use the `--dry` option to check changes first.
3. **Run Tests**: Always run tests after transformation to verify functionality.
4. **compat Mode**: es-toolkit/compat provides 100% compatible API with lodash.

## 🔗 Related Links

* [es-toolkit Official Documentation](https://es-toolkit.slash.page)
* [es-toolkit GitHub](https://github.com/toss/es-toolkit)

## 📄 License

MIT License - See [LICENSE](../../LICENSE) file for details.
