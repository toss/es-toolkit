type LiteralToPrimitive<T> = 
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends symbol ? symbol :
  T extends bigint ? bigint :
  T extends null ? null :
  T extends undefined ? undefined :
  T;