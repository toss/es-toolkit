import { bench, describe } from 'vitest';
import { toSnakeCaseKeys as toSnakeCaseKeysToolkit_ } from 'es-toolkit';
import lodashFp from 'lodash/fp';

const toSnakeCaseKeysToolkit = toSnakeCaseKeysToolkit_;

const toSnakeCaseKeysLodash = <T extends Record<string, any>>(obj: T) => {
  return lodashFp.mapKeys(lodashFp.snakeCase)(obj);
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

describe('toSnakeCaseKeys', () => {
  bench('es-toolkit/toSnakeCaseKeys (deep nested)', () => {
    toSnakeCaseKeysToolkit(testObject);
  });

  bench('lodash/fp/toSnakeCaseKeys (shallow comparison)', () => {
    toSnakeCaseKeysLodash(testObject);
  });
});
