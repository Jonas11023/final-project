import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import App from "../../App";

// Notifications are already mocked in jestSetup.js

// Firebase Auth mock
jest.mock("firebase/auth", () => {
  const mockOnAuthStateChanged = jest.fn((auth, cb) => {
    cb(null); // default: logged-out
    return jest.fn(); // unsubscribe
  });
  return { onAuthStateChanged: mockOnAuthStateChanged };
});

jest.mock("../../components/firebaseConfig", () => ({
  auth: {},
}));

describe("App Integration", () => {
  it("renders Login when no user is authenticated", async () => {
    const { onAuthStateChanged } = require("firebase/auth");
    onAuthStateChanged.mockImplementation((auth, cb) => {
      cb(null); // simulate logged-out
      return jest.fn();
    });

    const { getByText } = render(<App />);
    await waitFor(() => expect(getByText("Login")).toBeTruthy());
  });
});
