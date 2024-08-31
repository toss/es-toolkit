import { bench, describe } from 'vitest';  
import { fromEntries as fromEntriesToolkit } from 'es-toolkit';
import { fromPairs as fromPairsLodash } from 'lodash';  
  
describe('fromEntries/fromPairs', () => {  
  const data: [string, number][] = [  
    ['a', 1],  
    ['b', 2],  
    ['c', 3],   
  ];  
  
  bench('es-toolkit/fromEntries', () => {  
    fromEntriesToolkit(data);  
  });  
  
  bench('lodash/fromPairs', () => {  
    fromPairsLodash(data);  
  });  

  bench('javascript/fromEntries', () => {
    Object.fromEntries(data)
  })
});