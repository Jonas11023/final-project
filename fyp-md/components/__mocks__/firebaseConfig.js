// __mocks__/firebaseConfig.js

export const auth = {
  currentUser: { displayName: "Test User", uid: "user123" },
  signOut: jest.fn(() => Promise.resolve()),
};

const addMock = jest.fn(async (data) => ({ id: "2", ...data }));
const updateMock = jest.fn();
const deleteMock = jest.fn();

const mockDoc = jest.fn(() => ({
  get: jest.fn(() => Promise.resolve({ data: () => ({}) })),
  set: jest.fn(() => Promise.resolve()),
  update: updateMock,
  delete: deleteMock,
}));

const mockCollection = jest.fn(() => ({
  where: jest.fn(() => ({
    onSnapshot: jest.fn((cb) => {
      cb({
        docs: [{ id: "1", data: () => ({ name: "Test User", phone: "12345678" }) }],
      });
      return jest.fn(); // unsubscribe
    }),
  })),
  doc: mockDoc,
  add: addMock,
}));

export const FieldValue = {
  serverTimestamp: jest.fn(() => "mocked-timestamp"),
};

const firestoreMock = {
  collection: mockCollection,
  doc: mockDoc,
  FieldValue,
};

export const firestore = {
  collection: mockCollection,
  doc: mockDoc,
  FieldValue,
};

export default {
  auth,
  firestore: jest.fn(() => firestoreMock),
  FieldValue,
};
