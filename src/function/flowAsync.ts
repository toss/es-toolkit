/**
 * Creates a new function that executes the given functions in sequence,
 * awaiting each step's result before passing it to the next function. This
 * is the async counterpart of {@link flow}: where {@link flow} silently passes
 * a raw `Promise` to the next function (breaking async pipelines), `flowAsync`
 * resolves it first. The `this` context of the returned function is also
 * passed to the provided functions. See issue #1658.
 *
 * @param f The function to invoke.
 * @returns Returns the new composite async function.
 *
 * @example
 * const fetchUser = async (id: number) => db.users.find(id);
 * const getName = (user: User) => user.name;
 *
 * const getUserName = flowAsync(fetchUser, getName);
 * await getUserName(1); // resolves to the user's name (not a TypeError)
 *
 * @example
 * const add = (x: number, y: number) => x + y;
 * const asyncSquare = async (n: number) => n * n;
 * const double = (n: number) => n * 2;
 *
 * const combined = flowAsync(add, asyncSquare, double);
 * await combined(1, 2); // 18
 */
export function flowAsync<R>(f: () => Promise<R> | R): () => Promise<R>;
export function flowAsync<A extends any[], R1>(f1: (...args: A) => Promise<R1> | R1): (...args: A) => Promise<R1>;
export function flowAsync<A extends any[], R1, R2>(
  f1: (...args: A) => Promise<R1> | R1,
  f2: (a: R1) => Promise<R2> | R2
): (...args: A) => Promise<R2>;
export function flowAsync<A extends any[], R1, R2, R3>(
  f1: (...args: A) => Promise<R1> | R1,
  f2: (a: R1) => Promise<R2> | R2,
  f3: (a: R2) => Promise<R3> | R3
): (...args: A) => Promise<R3>;
export function flowAsync<A extends any[], R1, R2, R3, R4>(
  f1: (...args: A) => Promise<R1> | R1,
  f2: (a: R1) => Promise<R2> | R2,
  f3: (a: R2) => Promise<R3> | R3,
  f4: (a: R3) => Promise<R4> | R4
): (...args: A) => Promise<R4>;
export function flowAsync<A extends any[], R1, R2, R3, R4, R5>(
  f1: (...args: A) => Promise<R1> | R1,
  f2: (a: R1) => Promise<R2> | R2,
  f3: (a: R2) => Promise<R3> | R3,
  f4: (a: R3) => Promise<R4> | R4,
  f5: (a: R4) => Promise<R5> | R5
): (...args: A) => Promise<R5>;
/**
 * Creates a new function that executes the given functions in sequence,
 * awaiting each step's result before passing it to the next function.
 *
 * @param funcs The functions to invoke.
 * @returns Returns the new composite async function.
 *
 * @example
 * const add = (x: number, y: number) => x + y;
 * const asyncSquare = async (n: number) => n * n;
 *
 * const combined = flowAsync(add, asyncSquare);
 * await combined(1, 2); // 9
 */
export function flowAsync(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => Promise<any> {
  return async function (this: any, ...args: any[]) {
    let result = funcs.length ? await funcs[0].apply(this, args) : args[0];

    for (let i = 1; i < funcs.length; i++) {
      result = await funcs[i].call(this, result);
    }

    return result;
  };
}
