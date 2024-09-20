import { TSTypeKind } from 'ast-types/gen/kinds';

export type Param = {
  name: string;
  type: TSTypeKind;
};
