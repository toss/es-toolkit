/**
 * Lazy-evaluation primitives shared by {@link pipe} and the lazy-capable
 * functions (`map`, `filter`, `take`, `flatMap`, ...).
 *
 * A lazy function pairs an **eager** implementation (used when it runs on its
 * own) with a **generator** (used when `pipe` fuses adjacent lazy functions).
 * `pipe` chains the generators so each element is pulled through the whole run
 * on demand: a short-circuiting function such as `take` simply stops pulling,
 * and the functions before it never run on the rest of the input — no
 * intermediate arrays are allocated between steps.
 *
 * Author a lazy function with {@link combineEagerAndLazyFunctions}.
 */

/**
 * A generator that lazily turns an iterable of inputs into a stream of outputs.
 * Each lazy function provides one, and {@link pipe} chains them so that pulling
 * the last generator drives the entire fused run.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- a lazy generator consumes/produces erased element types
export type LazyGenerator = (values: Iterable<any>) => Generator<any>;

/**
 * A data-last function augmented with a {@link LazyGenerator} so that
 * {@link pipe} can fuse it with adjacent lazy functions. Calling it directly
 * runs the eager implementation; `pipe` uses `lazy` to build the fused pass.
 */
export interface LazyFunction {
  (input: unknown): unknown;
  readonly lazy: LazyGenerator;
}

/**
 * Pairs an eager data-last function with a lazy generator.
 *
 * The returned function behaves exactly like `eager` when called directly. When
 * placed inside a {@link pipe}, the attached generator lets `pipe` fuse it with
 * adjacent lazy functions into a single, short-circuiting pass.
 *
 * @template Eager - The eager data-last function type.
 * @param eager - The eager `(array) => result` implementation.
 * @param lazy - A generator that yields the same results lazily, one at a time.
 * @returns `eager`, augmented in place with the lazy generator.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic over any data-last function
export function combineEagerAndLazyFunctions<Eager extends (input: any) => any>(
  eager: Eager,
  lazy: LazyGenerator
): Eager {
  return Object.assign(eager, { lazy });
}
