export function bind(func: (...args: any[]) => any, thisArg?: any, ...partials: any[]): (...args: any[]) => any {
  const wrapper = function (this: any, ...args: any[]) {
    let index = 0;
    const result = partials.map(bindArg => {
      if (bindArg === bind.placeholder) {
        return args[index++];
      }
      return bindArg;
    });
    for (let i = index; i < args.length; i++) {
      result.push(args[i]);
    }
    if (this instanceof wrapper) {
      // @ts-expect-error - fn is a constructor
      return new func(...result);
    }
    return func.apply(thisArg, result);
  };
  wrapper.prototype = func.prototype;
  return wrapper;
}

bind.placeholder = Symbol('bind.placeholder');
