import type { FunctionInfo } from '../model/getFunctionInfo';
import { Container, Examples, Head, Parameters, Returns, Signature } from './components';

export function template(name: string, functionInfo: FunctionInfo[]): string {
  return Container(
    ...functionInfo.map(functionInfo =>
      Container(
        Head(name, functionInfo.description),
        Signature(functionInfo.signature),
        Parameters(functionInfo.parameters),
        Returns(functionInfo.returns),
        Examples(functionInfo.examples)
      )
    )
  );
}
