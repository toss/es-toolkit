# isRegExp

Checks if a given value is a `RegExp` instance.

```typescript
const result = isRegExp(value);
```

## Reference

### `isRegExp(value)`

Use `isRegExp` when you want to check if a value is a `RegExp` instance. It's useful for distinguishing regular expression objects from regular strings or other objects.

```typescript
import { isRegExp } from 'es-toolkit/predicate';

// RegExp instances
const regex1 = /abc/;
const regex2 = new RegExp('abc');
const regex3 = new RegExp('\\d+', 'g');

console.log(isRegExp(regex1)); // true
console.log(isRegExp(regex2)); // true
console.log(isRegExp(regex3)); // true

// Non-RegExp values
console.log(isRegExp('/abc/')); // false (string)
console.log(isRegExp('abc')); // false
console.log(isRegExp({})); // false
console.log(isRegExp(null)); // false
console.log(isRegExp(undefined)); // false
```

Useful for regex pattern validation or string processing:

```typescript
// Dynamic pattern validation
function validatePattern(pattern: unknown, text: string) {
  if (isRegExp(pattern)) {
    // TypeScript infers pattern as RegExp
    return pattern.test(text);
  }

  // Convert string patterns to regex
  if (typeof pattern === 'string') {
    const regex = new RegExp(pattern);
    return regex.test(text);
  }

  return false;
}

// Usage examples
console.log(validatePattern(/hello/, 'hello world')); // true
console.log(validatePattern('\\d+', '123')); // true
console.log(validatePattern('invalid', 'text')); // false

// Use in form validation
function createValidator(rule: unknown) {
  if (isRegExp(rule)) {
    return (value: string) => rule.test(value);
  }

  // Other rule types...
  return () => false;
}

// Create email validator
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValidator = createValidator(emailRegex);

console.log(emailValidator('test@example.com')); // true
console.log(emailValidator('invalid-email')); // false
```

Use in conditional string processing:

```typescript
// Text processing utility
function processText(input: string, processor: unknown) {
  if (isRegExp(processor)) {
    // Extract matching parts with regex
    const matches = input.match(processor);
    return matches ? matches : [];
  }

  // Other processor types...
  return [input];
}

// Extract numbers
const numberRegex = /\d+/g;
const numbers = processText('Price: 1000 won, Discount: 200 won', numberRegex);
console.log(numbers); // ['1000', '200']

// Extract URLs
const urlRegex = /https?:\/\/[^\s]+/g;
const urls = processText('Website: https://example.com reference', urlRegex);
console.log(urls); // ['https://example.com']

// Configuration-based text validation
class TextValidator {
  private rules: Array<{ name: string; rule: unknown }> = [];

  addRule(name: string, rule: unknown) {
    this.rules.push({ name, rule });
  }

  validate(text: string) {
    const results: Array<{ rule: string; passed: boolean }> = [];

    for (const { name, rule } of this.rules) {
      if (isRegExp(rule)) {
        results.push({
          rule: name,
          passed: rule.test(text),
        });
      } else {
        results.push({
          rule: name,
          passed: false,
        });
      }
    }

    return results;
  }
}

// Usage example
const validator = new TextValidator();
validator.addRule('Letters only', /^[a-zA-Z]+$/);
validator.addRule('Contains number', /\d/);
validator.addRule('No special chars', /^[^!@#$%^&*()]+$/);

console.log(validator.validate('Hello123'));
// [
//   { rule: 'Letters only', passed: false },
//   { rule: 'Contains number', passed: true },
//   { rule: 'No special chars', passed: true }
// ]
```

Distinguishing between strings and regular expressions:

```typescript
// Use in search functionality
function searchText(content: string, query: unknown) {
  if (isRegExp(query)) {
    // Regex search - advanced pattern matching
    const matches = content.match(query);
    return matches ? matches.length : 0;
  }

  if (typeof query === 'string') {
    // Regular string search
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = content.match(regex);
    return matches ? matches.length : 0;
  }

  return 0;
}

// Usage examples
const text = 'Hello world! Hello everyone!';

console.log(searchText(text, /hello/gi)); // 2 (regex)
console.log(searchText(text, 'Hello')); // 2 (string, escaped)
console.log(searchText(text, /h.llo/i)); // 2 (pattern matching)

// Dynamic filtering
function createFilter(patterns: unknown[]) {
  const regexPatterns = patterns.filter(isRegExp);

  return (text: string) => {
    return regexPatterns.some(pattern => pattern.test(text));
  };
}

// Spam filter example
const spamPatterns = [
  /\b(ad|promo)\b/,
  /\d{3}-\d{4}-\d{4}/, // Phone number pattern
  'invalid', // Not a RegExp, excluded from filter
  /\$\d+/, // Price pattern
];

const spamFilter = createFilter(spamPatterns);
console.log(spamFilter('Urgent ad!')); // true
console.log(spamFilter('Hello')); // false
```

Using regex flags and properties:

```typescript
// Check RegExp properties
function analyzeRegex(value: unknown) {
  if (isRegExp(value)) {
    return {
      source: value.source,
      flags: value.flags,
      global: value.global,
      ignoreCase: value.ignoreCase,
      multiline: value.multiline,
      unicode: value.unicode,
      sticky: value.sticky,
    };
  }

  return null;
}

// Usage example
const regex = /hello/gim;
const analysis = analyzeRegex(regex);
console.log(analysis);
// {
//   source: 'hello',
//   flags: 'gim',
//   global: true,
//   ignoreCase: true,
//   multiline: true,
//   unicode: false,
//   sticky: false
// }

// Clone regex
function cloneRegex(value: unknown) {
  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags);
  }

  return null;
}

const originalRegex = /test/gi;
const clonedRegex = cloneRegex(originalRegex);
console.log(clonedRegex?.test('TEST')); // true
```

#### Parameters

- `value` (`unknown`): The value to check if it's a RegExp instance.

#### Returns

(`value is RegExp`): Returns `true` if the value is a RegExp instance, `false` otherwise.
