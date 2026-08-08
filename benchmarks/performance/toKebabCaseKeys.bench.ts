import { bench, describe } from 'vitest';
import { toKebabCaseKeys as toKebabCaseKeysToolkit } from 'es-toolkit';
import lodashFp from 'lodash/fp';

const toKebabCaseKeysLodash = <T extends Record<string, any>>(obj: T) => {
  return lodashFp.mapKeys(lodashFp.kebabCase)(obj);
};

const testObject = {
  userId: 1,
  firstName: 'John',
  lastName: 'Doe',
  addressInfo: {
    streetName: 'Main St',
    zipCode: '12345',
    contactDetails: {
      phoneNumber: '123-456-7890',
      emailAddress: 'john.doe@example.com',
    },
  },
  orderHistory: [
    { orderId: 1001, orderDate: '2023-01-15', totalAmount: 125.99 },
    { orderId: 1002, orderDate: '2023-02-22', totalAmount: 89.5 },
  ],
};

describe('toKebabCaseKeys', () => {
  bench('es-toolkit/toKebabCaseKeys (deep nested)', () => {
    toKebabCaseKeysToolkit(testObject);
  });

  bench('lodash/fp/toKebabCaseKeys (shallow comparison)', () => {
    toKebabCaseKeysLodash(testObject);
  });
});
