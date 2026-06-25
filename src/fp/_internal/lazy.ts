/**
 * Lazy-evaluation primitives shared by {@link pipe} and the lazy-capable
 * functions (`map`, `filter`, `take`, `flatMap`, ...).
 *
 * A lazy function pairs an **eager** implementation (used when it runs on its
 * own) with a **lazy transform**. Instead of generators, the lazy form is a
 * "push" pipeline: each function receives the next stage's sink and pushes
 * values into it via `emit`. `pipe` composes the transforms and drives them with
 * a single loop over the input; a short-circuiting function (e.g. `take`) returns
 * `false` to stop the loop at once — no generator suspend/resume and no
 * per-element iterator objects.
 *
 * Author a lazy function with {@link createLazyFunction} and attach it with
 * {@link combineEagerAndLazyFunctions}.
 */

/**
 * Receives one value pushed from upstream. Returns `false` to signal that the
 * run is finished and no more values should be pushed.
 */
export type Sink<T> = (value: T) => boolean;

/**
 * Wraps a downstream {@link Sink} into an upstream one. This is the lazy form
 * `pipe` composes (last function first) and drives.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- transforms erase element types between stages
export type LazyTransform = (down: Sink<any>) => Sink<any>;

/**
 * A data-last function augmented with its lazy transform and a `shortCircuit`
 * flag (set by functions like `take` that can end a run early). `pipe` fuses a
 * run lazily when it short-circuits (or when the input is a non-array iterable);
 * otherwise it runs each function eagerly.
 */
export interface OperatorFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- an operator accepts and returns erased values
  (input: any): any;
  lazy?: LazyTransform;
  shortCircuit?: boolean;
}

interface CombineOptions {
  shortCircuit?: boolean;
}

/**
 * Pairs an eager data-last function with a lazy transform (see
 * {@link createLazyFunction}).
 *
 * The returned function behaves exactly like `eager` when called directly. When
 * placed inside a {@link pipe}, the attached transform lets `pipe` fuse it with
 * adjacent lazy functions into a single, short-circuiting pass.
 *
 * @template Eager - The eager data-last function type.
 * @param eager - The eager `(array) => result` implementation.
 * @param lazy - The lazy transform built by {@link createLazyFunction}.
 * @param options - Set `shortCircuit: true` for functions that can end a run early.
 * @returns `eager`, augmented in place with the lazy metadata.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic over any data-last function
export function combineEagerAndLazyFunctions<Eager extends (input: any) => any>(
  eager: Eager,
  lazy: LazyTransform,
  { shortCircuit }: CombineOptions = {}
): Eager {
  return Object.assign(eager, { lazy, shortCircuit });
}

/**
 * Builds a {@link LazyTransform} from a per-element `step`.
 *
 * `step` receives each input `value`, its zero-based `index` within this stage,
 * and an `emit` callback that forwards a result to the next stage. Call `emit`
 * zero times (drop), once (`map`), or many times (`flatMap`). Return
 * `false` to end the run after this element (used by short-circuiting functions
 * like `take`); returning nothing continues.
 *
 * @template T - The type of values entering this stage.
 * @template U - The type of values it emits.
 * @param step - The per-element push function.
 * @returns A lazy transform that `pipe` can fuse and drive.
 *
 * @example
 * // map
 * createLazyFunction<T, U>((value, index, emit) => {
 *   emit(callback(value, index));
 * });
 */
export function createLazyFunction<T, U>(
  step: (value: T, index: number, emit: (value: U) => void) => boolean | void
): LazyTransform {
  return (emit: Sink<U>): Sink<T> => {
    let index = 0;
    let active = true;

    const _emit = (value: U): void => {
      if (!active) {
        return;
      }

      const finished = emit(value) === false;

      if (finished) {
        active = false;
      }
    };

    return (value: T): boolean => {
      if (step(value, index++, _emit) === false) {
        active = false;
      }
      return active;
    };
  };
}
