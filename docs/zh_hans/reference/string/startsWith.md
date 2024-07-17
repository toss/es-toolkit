 # startsWith
 
TODO translate to chineese

 Converts a string to kebab case.

 Snake case is the naming convention in which each word is written in lowercase and separated by an dash (\-) character. For example, `kebab_case`.

 ## Signature

 ```typescript
 function startsWith(str: string, target: string, position: number = 0): string;
 ```

 ### Parameters

 - `str` (`string`): The string that will be searched.
 - `target` (`string`): The string that it should contain at the start.
 - `position` (`number`, optional): Optional: offset to start searching in the str string.

 ### Returns

 (`boolean`) Whether or not the str string starts with the target string

 ## Examples

 ```typescript
 import { startsWith } from 'es-toolkit/string';

 startsWith('fooBar', 'foo') // returns true
 startsWith('fooBar', 'Bar') // returns false
 startsWith('fooBar', 'abcdef') // returns false
 startsWith('fooBar', 'Bar', 3) // returns true
 ```
