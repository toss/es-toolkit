
export function negate<F extends (...args: unknown[]) => boolean>(func: F): F {
    return ((...args: any[]) => !func(...args)) as F;
}
