import { getFunctionDescriptions } from './getFunctionDescriptions';
import { getFunctionTypes } from './getFunctionTypes';

export type FunctionInfo = {
  description: string;
  parameters: {
    [key: string]: {
      type: string;
      description: string;
    };
  };
  returns: {
    type: string;
    description: string;
  };
  examples: string[];
  signature: string;
};

export function getFunctionInfo(source: string): FunctionInfo[] {
  const { functionNodes, types } = getFunctionTypes(source);
  const descriptions = getFunctionDescriptions(source, functionNodes);

  return descriptions.map((description, index) => {
    const combinedParams = {};

    for (const key in types[index].params) {
      combinedParams[key] = {
        type: types[index].params[key],
        description: description.parameters[key] || '',
      };
    }

    return {
      description: description.description,
      parameters: combinedParams,
      returns: {
        type: types[index].returns,
        description: description.returns,
      },
      examples: description.examples,
      signature: types[index].signature,
    };
  });
}
