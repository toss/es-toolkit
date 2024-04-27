export const separateArgs = <T, Func>(args: [...rest: T[], last: Func]) => {
  const last = args.pop();
  return { args, last } as { args: T[]; last: Func };
};
