// jestSetup.js

// 1️⃣ Extend jest matchers for React Native Testing Library
import '@testing-library/jest-native/extend-expect';

// 2️⃣ Mock react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// 3️⃣ Mock Expo Constants
jest.mock('expo-constants', () => ({
  manifest: {},
}));

// 4️⃣ Mock Expo Notifications
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  addNotificationReceivedListener: jest.fn(),
  addNotificationResponseReceivedListener: jest.fn(),
  removeNotificationSubscription: jest.fn(),
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: "granted" })),
}));

// 5️⃣ Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));
