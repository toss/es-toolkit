type Placeholder = typeof partialRightPlaceholder;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template R The return type of the function.
 * @param {() => R} func The function to invoke.
 * @returns {() => R} Returns the new function.
 * @example
 * const getValue = () => 42;
 * const getValueFunc = partialRight(getValue);
 * console.log(getValueFunc()); // => 42
 */
export function partialRight<R>(func: () => R): () => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template R The return type of the function.
 * @param {(arg1: T1) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @returns {() => R} Returns the new partially applied function.
 * @example
 * const addOne = (num: number) => num + 1;
 * const addOneFunc = partialRight(addOne, 1);
 * console.log(addOneFunc()); // => 2
 */
export function partialRight<T1, R>(func: (arg1: T1) => R, arg1: T1): () => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template R The return type of the function.
 * @param {(arg1: T1) => R} func The function to partially apply arguments to.
 * @returns {(arg1: T1) => R} Returns the new partially applied function.
 * @example
 * const multiplyBy = (factor: number) => (num: number) => num * factor;
 * const double = partialRight(multiplyBy(2));
 * console.log(double(5)); // => 10
 */
export function partialRight<T1, R>(func: (arg1: T1) => R): (arg1: T1) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template R The return type of the function.
 * @param {(arg1: T1) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @returns {() => R} Returns the new partially applied function.
 * @example
 * const greet = (name: string) => `Hello, ${name}!`;
 * const greetJohn = partialRight(greet, 'John');
 * console.log(greetJohn()); // => 'Hello, John!'
 */
export function partialRight<T1, R>(func: (arg1: T1) => R, arg1: T1): () => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2) => R} func The function to partially apply arguments to.
 * @returns {(arg1: T1, arg2: T2) => R} Returns the new partially applied function.
 * @example
 * const subtract = (a: number, b: number) => a - b;
 * const subtractFive = partialRight(subtract);
 * console.log(subtractFive(10, 5)); // => 5
 */
export function partialRight<T1, T2, R>(func: (arg1: T1, arg2: T2) => R): (arg1: T1, arg2: T2) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {Placeholder} arg2 The placeholder for the second argument.
 * @returns {(arg2: T2) => R} Returns the new partially applied function.
 * @example
 * const concat = (a: string, b: string) => a + b;
 * const concatWithHello = partialRight(concat, 'Hello', partialRight.placeholder);
 * console.log(concatWithHello(' World!')); // => 'Hello World!'
 */
export function partialRight<T1, T2, R>(func: (arg1: T1, arg2: T2) => R, arg1: T1, arg2: Placeholder): (arg2: T2) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2) => R} func The function to partially apply arguments to.
 * @param {T2} arg2 The second argument to be partially applied.
 * @returns {(arg1: T1) => R} Returns the new partially applied function.
 * @example
 * const divide = (a: number, b: number) => a / b;
 * const divideByTwo = partialRight(divide, 2);
 * console.log(divideByTwo(10)); // => 5
 */
export function partialRight<T1, T2, R>(func: (arg1: T1, arg2: T2) => R, arg2: T2): (arg1: T1) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {T2} arg2 The second argument to be partially applied.
 * @returns {() => R} Returns the new partially applied function.
 * @example
 * const multiply = (a: number, b: number) => a * b;
 * const multiplyByThreeAndFour = partialRight(multiply, 3, 4);
 * console.log(multiplyByThreeAndFour()); // => 12
 */
export function partialRight<T1, T2, R>(func: (arg1: T1, arg2: T2) => R, arg1: T1, arg2: T2): () => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3) => R} func The function to partially apply arguments to.
 * @returns {(arg1: T1, arg2: T2, arg3: T3) => R} Returns the new partially applied function.
 * @example
 * const sumThree = (a: number, b: number, c: number) => a + b + c;
 * const sumWithFive = partialRight(sumThree);
 * console.log(sumWithFive(1, 2, 5)); // => 8
 */
export function partialRight<T1, T2, T3, R>(
  func: (arg1: T1, arg2: T2, arg3: T3) => R
): (arg1: T1, arg2: T2, arg3: T3) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {Placeholder} arg2 The placeholder for the second argument.
 * @param {Placeholder} arg3 The placeholder for the third argument.
 * @returns {(arg2: T2, arg3: T3) => R} Returns the new partially applied function.
 * @example
 * const formatDate = (day: number, month: number, year: number) => `${day}/${month}/${year}`;
 * const formatDateWithDay = partialRight(formatDate, 1, partialRight.placeholder, partialRight.placeholder);
 * console.log(formatDateWithDay(12, 2023)); // => '1/12/2023'
 */
export function partialRight<T1, T2, T3, R>(
  func: (arg1: T1, arg2: T2, arg3: T3) => R,
  arg1: T1,
  arg2: Placeholder,
  arg3: Placeholder
): (arg2: T2, arg3: T3) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3) => R} func The function to partially apply arguments to.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {Placeholder} arg3 The placeholder for the third argument.
 * @returns {(arg1: T1, arg3: T3) => R} Returns the new partially applied function.
 * @example
 * const createUser = (name: string, age: number, country: string) => `${name}, ${age} years old from ${country}`;
 * const createUserFromUSA = partialRight(createUser, 'USA', partialRight.placeholder);
 * console.log(createUserFromUSA('John', 30)); // => 'John, 30 years old from USA'
 */
export function partialRight<T1, T2, T3, R>(
  func: (arg1: T1, arg2: T2, arg3: T3) => R,
  arg2: T2,
  arg3: Placeholder
): (arg1: T1, arg3: T3) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {Placeholder} arg3 The placeholder for the third argument.
 * @returns {(arg3: T3) => R} Returns the new partially applied function.
 * @example
 * const logMessage = (level: string, message: string, timestamp: string) => `[${level}] ${message} at ${timestamp}`;
 * const logError = partialRight(logMessage, 'ERROR', '2023-10-01');
 * console.log(logError('Something went wrong!')); // => '[ERROR] Something went wrong! at 2023-10-01'
 */
export function partialRight<T1, T2, T3, R>(
  func: (arg1: T1, arg2: T2, arg3: T3) => R,
  arg1: T1,
  arg2: T2,
  arg3: Placeholder
): (arg3: T3) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3) => R} func The function to partially apply arguments to.
 * @param {T3} arg3 The third argument to be partially applied.
 * @returns {(arg1: T1, arg2: T2) => R} Returns the new partially applied function.
 * @example
 * const calculateArea = (length: number, width: number) => length * width;
 * const calculateAreaWithWidth = partialRight(calculateArea, 5);
 * console.log(calculateAreaWithWidth(10)); // => 50
 */
export function partialRight<T1, T2, T3, R>(
  func: (arg1: T1, arg2: T2, arg3: T3) => R,
  arg3: T3
): (arg1: T1, arg2: T2) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {Placeholder} arg2 The placeholder for the second argument.
 * @param {T3} arg3 The third argument to be partially applied.
 * @returns {(arg2: T2) => R} Returns the new partially applied function.
 * @example
 * const formatCurrency = (amount: number, currency: string) => `${amount} ${currency}`;
 * const formatUSD = partialRight(formatCurrency, 100, partialRight.placeholder);
 * console.log(formatUSD('USD')); // => '100 USD'
 */
export function partialRight<T1, T2, T3, R>(
  func: (arg1: T1, arg2: T2, arg3: T3) => R,
  arg1: T1,
  arg2: Placeholder,
  arg3: T3
): (arg2: T2) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3) => R} func The function to partially apply arguments to.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {T3} arg3 The third argument to be partially applied.
 * @returns {(arg1: T1) => R} Returns the new partially applied function.
 * @example
 * const createProfile = (name: string, age: number, country: string) => `${name}, ${age} from ${country}`;
 * const createProfileFromCanada = partialRight(createProfile, 'Canada', 'John');
 * console.log(createProfileFromCanada(30)); // => 'John, 30 from Canada'
 */
export function partialRight<T1, T2, T3, R>(
  func: (arg1: T1, arg2: T2, arg3: T3) => R,
  arg2: T2,
  arg3: T3
): (arg1: T1) => R;

export function partialRight<T1, T2, T3, R>(
  func: (arg1: T1, arg2: T2, arg3: T3) => R,
  arg1: T1,
  arg2: T2,
  arg3: T3
): () => R;
/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @returns {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} Returns a new function that takes four arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {Placeholder} arg2 The placeholder for the second argument.
 * @param {Placeholder} arg3 The placeholder for the third argument.
 * @param {Placeholder} arg4 The placeholder for the fourth argument.
 * @returns {(arg2: T2, arg3: T3, arg4: T4) => R} Returns a new function that takes the second, third, and fourth arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg1: T1,
  arg2: Placeholder,
  arg3: Placeholder,
  arg4: Placeholder
): (arg2: T2, arg3: T3, arg4: T4) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {Placeholder} arg3 The placeholder for the third argument.
 * @param {Placeholder} arg4 The placeholder for the fourth argument.
 * @returns {(arg1: T1, arg3: T3, arg4: T4) => R} Returns a new function that takes the first, third, and fourth arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg2: T2,
  arg3: Placeholder,
  arg4: Placeholder
): (arg1: T1, arg3: T3, arg4: T4) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {Placeholder} arg3 The placeholder for the third argument.
 * @param {Placeholder} arg4 The placeholder for the fourth argument.
 * @returns {(arg3: T3, arg4: T4) => R} Returns a new function that takes the third and fourth arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg1: T1,
  arg2: T2,
  arg3: Placeholder,
  arg4: Placeholder
): (arg3: T3, arg4: T4) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T3} arg3 The third argument to be partially applied.
 * @param {Placeholder} arg4 The placeholder for the fourth argument.
 * @returns {(arg1: T1, arg2: T2, arg4: T4) => R} Returns a new function that takes the first, second, and fourth arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg3: T3,
  arg4: Placeholder
): (arg1: T1, arg2: T2, arg4: T4) => R;

/**
 * Creates a function that invokes `func` with the first argument, a placeholder for the second argument,
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {Placeholder} arg2 The placeholder for the second argument.
 * @param {T3} arg3 The third argument to be partially applied.
 * @param {Placeholder} arg4 The placeholder for the fourth argument.
 * @returns {(arg2: T2, arg4: T4) => R} Returns a new function that takes the second and fourth arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg1: T1,
  arg2: Placeholder,
  arg3: T3,
  arg4: Placeholder
): (arg2: T2, arg4: T4) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {T3} arg3 The third argument to be partially applied.
 * @param {Placeholder} arg4 The placeholder for the fourth argument.
 * @returns {(arg1: T1, arg4: T4) => R} Returns a new function that takes the first and fourth arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg2: T2,
  arg3: T3,
  arg4: Placeholder
): (arg1: T1, arg4: T4) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {T3} arg3 The third argument to be partially applied.
 * @param {Placeholder} arg4 The placeholder for the fourth argument.
 * @returns {(arg4: T4) => R} Returns a new function that takes the fourth argument.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: Placeholder
): (arg4: T4) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T4} arg4 The fourth argument to be partially applied.
 * @returns {(arg1: T1, arg2: T2, arg3: T3) => R} Returns a new function that takes the first, second, and third arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg4: T4
): (arg1: T1, arg2: T2, arg3: T3) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {Placeholder} arg2 The placeholder for the second argument.
 * @param {Placeholder} arg3 The placeholder for the third argument.
 * @param {T4} arg4 The fourth argument to be partially applied.
 * @returns {(arg2: T2, arg3: T3) => R} Returns a new function that takes the second and third arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg1: T1,
  arg2: Placeholder,
  arg3: Placeholder,
  arg4: T4
): (arg2: T2, arg3: T3) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {Placeholder} arg3 The placeholder for the third argument.
 * @param {T4} arg4 The fourth argument to be partially applied.
 * @returns {(arg1: T1, arg3: T3) => R} Returns a new function that takes the first and third arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg2: T2,
  arg3: Placeholder,
  arg4: T4
): (arg1: T1, arg3: T3) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {Placeholder} arg3 The placeholder for the third argument.
 * @param {T4} arg4 The fourth argument to be partially applied.
 * @returns {(arg3: T3) => R} Returns a new function that takes the third argument.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg1: T1,
  arg2: T2,
  arg3: Placeholder,
  arg4: T4
): (arg3: T3) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T3} arg3 The third argument to be partially applied.
 * @param {T4} arg4 The fourth argument to be partially applied.
 * @returns {(arg1: T1, arg2: T2) => R} Returns a new function that takes the first and second arguments.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg3: T3,
  arg4: T4
): (arg1: T1, arg2: T2) => R;
/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {Placeholder} arg2 The placeholder for the second argument.
 * @param {T3} arg3 The third argument to be partially applied.
 * @param {T4} arg4 The fourth argument to be partially applied.
 * @returns {(arg2: T2) => R} Returns a new function that takes the second argument.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg1: T1,
  arg2: Placeholder,
  arg3: T3,
  arg4: T4
): (arg2: T2) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {T3} arg3 The third argument to be partially applied.
 * @param {T4} arg4 The fourth argument to be partially applied.
 * @returns {(arg1: T1) => R} Returns a new function that takes the first argument.
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg2: T2,
  arg3: T3,
  arg4: T4
): (arg1: T1) => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template T1 The type of the first argument.
 * @template T2 The type of the second argument.
 * @template T3 The type of the third argument.
 * @template T4 The type of the fourth argument.
 * @template R The return type of the function.
 * @param {(arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R} func The function to partially apply arguments to.
 * @param {T1} arg1 The first argument to be partially applied.
 * @param {T2} arg2 The second argument to be partially applied.
 * @param {T3} arg3 The third argument to be partially applied.
 * @param {T4} arg4 The fourth argument to be partially applied.
 * @returns {() => R} Returns the new partially applied function.
 * @example
 * const concatenate = (a: string, b: string, c: string, d: string) => a + b + c + d;
 * const concatenateHelloWorld = partialRight(concatenate, 'Hello', ' ', 'World', '!');
 * console.log(concatenateHelloWorld()); // => 'Hello World!'
 */
export function partialRight<T1, T2, T3, T4, R>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4
): () => R;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template F The type of the function to partially apply.
 * @param {F} func The function to partially apply arguments to.
 * @param {...any[]} args The arguments to be partially applied.
 * @returns {function(...args: any[]): ReturnType<F>} Returns the new partially applied function.
 * @example
 * const log = (...messages: string[]) => console.log(...messages);
 * const logError = partialRight(log, 'Error:');
 * logError('Something went wrong!'); // => 'Error: Something went wrong!'
 */
export function partialRight(func: (...args: any[]) => any, ...args: any[]): (...args: any[]) => any;

/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template F The type of the function to partially apply.
 * @param {F} func The function to partially apply arguments to.
 * @param {any[]} partialArgs The arguments to be partially applied.
 * @returns {(...args: any[]) => ReturnType<F>} Returns the new partially applied function.
 *
 * @example
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 *
 * const greetFred = partialRight(greet, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 *
 * // Partially applied with placeholders.
 * const sayHelloTo = partialRight(greet, 'hello', partialRight.placeholder);
 * sayHelloTo('fred');
 * // => 'hello fred'
 */
export function partialRight<F extends (...args: any[]) => any>(
  func: F,
  ...partialArgs: any[]
): (...args: any[]) => ReturnType<F> {
  return function (this: any, ...providedArgs: any[]) {
    const placeholderLength = partialArgs.filter(arg => arg === partialRightPlaceholder).length;
    const rangeLength = Math.max(providedArgs.length - placeholderLength, 0);
    const args: any[] = [];

    let providedIndex = 0;
    for (let i = 0; i < rangeLength; i++) {
      args.push(providedArgs[providedIndex++]);
    }
    for (let i = 0; i < partialArgs.length; i++) {
      const arg = partialArgs[i];

      if (arg === partialRight.placeholder) {
        args.push(providedArgs[providedIndex++]);
      } else {
        args.push(arg);
      }
    }
    return func.apply(this, args);
  } as any as F;
}

const partialRightPlaceholder: unique symbol = Symbol('partialRight.placeholder');
partialRight.placeholder = partialRightPlaceholder;
