 # kebabCase

 Converts a string to kebab case.

 Kebab case is the naming convention in which each word is written in lowercase and separated by an dash (\-) character. For example, `kebab-case`.

 ## Signature

 ```typescript
 function kebabCase(str: string): string;
 ```

 ### Parameters

 - `str` (`string`): The string that is to be changed to kebab case.

 ### Returns

 (`string`) The converted string to kebab case.

 ## Examples

 ```typescript
 import { kebabCase } from 'es-toolkit/string';

 kebabCase('camelCase'); // returns 'camel-case'
 kebabCase('some whitespace'); // returns 'some-whitespace'
 kebabCase('hyphen-text'); // returns 'hyphen-text'
 kebabCase('HTTPRequest'); // returns 'http-request'
 ```
