import { bench, describe } from 'vitest';
import { camelizeKeys as camelizeKeysToolkit_ } from 'es-toolkit';
import lodashFp from 'lodash/fp';

const camelizeKeysToolkit = camelizeKeysToolkit_;

const camelizeKeysLodash = <T extends Record<string, any>>(obj: T) => {
  return lodashFp.mapKeys(lodashFp.camelCase)(obj);
};

const testObject = {
  user_id: 1,
  first_name: 'John',
  last_name: 'Doe',
  address_info: {
    street_name: 'Main St',
    zip_code: '12345',
    contact_details: {
      phone_number: '123-456-7890',
      email_address: 'john.doe@example.com',
    },
  },
  order_history: [
    { order_id: 1001, order_date: '2023-01-15', total_amount: 125.99 },
    { order_id: 1002, order_date: '2023-02-22', total_amount: 89.5 },
  ],
};

describe('camelizeKeys', () => {
  bench('es-toolkit/camelizeKeys (deep nested)', () => {
    camelizeKeysToolkit(testObject);
  });

  bench('lodash/fp/camelizeKeys (shallow comparison)', () => {
    camelizeKeysLodash(testObject);
  });
});
