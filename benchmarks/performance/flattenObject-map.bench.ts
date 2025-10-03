import { bench, describe } from 'vitest';
import { flattenObject } from '../../src/object/flattenObject.ts';

// Create nested objects for testing
function createNestedObject(depth: number, width: number) {
  const obj: any = {};

  for (let i = 0; i < width; i++) {
    const key = `key${i}`;

    if (depth > 1) {
      obj[key] = createNestedObject(depth - 1, width);
    } else {
      obj[key] = `value${i}`;
    }
  }

  return obj;
}

// Real-world translation-like data structure
const translationLikeData = {
  welcome: {
    title: 'Welcome to our app',
    subtitle: 'Get started today',
    buttons: {
      login: 'Login',
      signup: 'Sign Up',
      forgot: 'Forgot Password',
    },
  },
  navigation: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    settings: {
      profile: 'Profile',
      preferences: 'Preferences',
      security: 'Security',
      notifications: {
        email: 'Email',
        push: 'Push',
        sms: 'SMS',
      },
    },
  },
  errors: {
    validation: {
      required: 'This field is required',
      email: 'Invalid email format',
      password: 'Password too weak',
      confirm: 'Passwords do not match',
    },
    network: ['Connection failed', 'Timeout error', 'Server error'],
    auth: {
      unauthorized: 'Unauthorized access',
      forbidden: 'Access forbidden',
      expired: 'Session expired',
    },
  },
  features: {
    premium: {
      analytics: 'Advanced Analytics',
      support: 'Priority Support',
      storage: 'Unlimited Storage',
    },
    free: {
      basic: 'Basic Features',
      limited: 'Limited Storage',
    },
  },
};

describe('flattenObject Map conversion performance', () => {
  bench('legacy: flattenObject + Object.entries + new Map', () => {
    new Map(Object.entries(flattenObject(translationLikeData)));
  });

  bench('new: flattenObject with Map target', () => {
    flattenObject(translationLikeData, new Map());
  });
});

describe('flattenObject Map conversion - large data', () => {
  const largeNestedObject = createNestedObject(4, 10); // depth 4, 10 keys per level

  bench('legacy (large): flattenObject + Object.entries + new Map', () => {
    new Map(Object.entries(flattenObject(largeNestedObject)));
  });

  bench('new (large): flattenObject with Map target', () => {
    flattenObject(largeNestedObject, new Map());
  });
});

describe('flattenObject Map conversion - very large data', () => {
  const veryLargeNestedObject = createNestedObject(5, 20); // depth 5, 20 keys per level

  bench('legacy (very large): flattenObject + Object.entries + new Map', () => {
    new Map(Object.entries(flattenObject(veryLargeNestedObject)));
  });

  bench('new (very large): flattenObject with Map target', () => {
    flattenObject(veryLargeNestedObject, new Map());
  });
});

describe('flattenObject Map with custom delimiter', () => {
  bench('legacy: flattenObject with delimiter + Object.entries + new Map', () => {
    new Map(Object.entries(flattenObject(translationLikeData, { delimiter: '_' })));
  });

  bench('new: flattenObject with delimiter and Map target', () => {
    flattenObject(translationLikeData, { delimiter: '_', target: new Map() });
  });
});
