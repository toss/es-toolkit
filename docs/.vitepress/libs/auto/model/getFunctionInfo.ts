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
  signatures: string[];
};

export function getFunctionInfo(source: string): FunctionInfo[] {
  const { functionNodes, types } = getFunctionTypes(source);
  const descriptions = getFunctionDescriptions(source, functionNodes);
  const lastIndex = descriptions.length - 1;

  return descriptions.map((description, index) => {
    const combinedParams = {};
    const signatures: string[] = [types[index].signature];

    for (const key in types[index].params) {
      combinedParams[key] = {
        type: types[index].params[key],
        description: description.parameters[key] || '',
      };
    }

    if (index === lastIndex) {
      signatures.push(...types.slice(index + 1).map(type => type.signature));
    }

    return {
      description: description.description,
      parameters: combinedParams,
      returns: {
        type: types[index].returns,
        description: description.returns,
      },
      examples: description.examples,
      signatures,
    };
  });
}
