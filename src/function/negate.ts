
export function negate<Parameters extends unknown[]>(func: (...args: Parameters) => unknown) {
    return (...args: Parameters) => !func(...args)
}
