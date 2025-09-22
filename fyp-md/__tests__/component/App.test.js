import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import App from "../../App";

// Mock Firebase Auth
jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn((auth, cb) => {
    cb(null); // no user authenticated
    return jest.fn(); // unsubscribe function
  }),
}));

jest.mock("../../components/firebaseConfig", () => ({
  auth: {},
}));

describe("App Component", () => {
  it("renders login flow when no user is authenticated", async () => {
    const { getByText } = render(<App />);

    // Wait for "Login" button
    await waitFor(() => expect(getByText("Login")).toBeTruthy());

    // Match the actual text in your LoginScreen
    await waitFor(() =>
      expect(getByText(/Don’t have an account\? Register/i)).toBeTruthy()
    );

    // Optional: check "Forgot Password?" text
    await waitFor(() =>
      expect(getByText(/Forgot Password\?/i)).toBeTruthy()
    );
  });
});
