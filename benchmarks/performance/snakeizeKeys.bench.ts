import { bench, describe } from 'vitest';
import { snakeizeKeys as snakeizeKeysToolkit_ } from 'es-toolkit';
import lodashFp from 'lodash/fp';

const snakeizeKeysToolkit = snakeizeKeysToolkit_;

const snakeizeKeysLodash = <T extends Record<string, any>>(obj: T) => {
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

describe('snakeizeKeys', () => {
  bench('es-toolkit/snakeizeKeys', () => {
    snakeizeKeysToolkit(testObject);
  });

  bench('lodash/fp/snakeizeKeys', () => {
    snakeizeKeysLodash(testObject);
  });

  bench('es-toolkit/snakeizeKeys (deep nested)', () => {
    snakeizeKeysToolkit(testObject);
  });

  bench('lodash/fp/snakeizeKeys (deep nested)', () => {
    snakeizeKeysLodash(testObject);
  });

  bench('es-toolkit/snakeizeKeys (array)', () => {
    snakeizeKeysToolkit(testObject.orderHistory);
  });

  bench('lodash/fp/snakeizeKeys (array)', () => {
    snakeizeKeysLodash(testObject.orderHistory as any);
  });
});
