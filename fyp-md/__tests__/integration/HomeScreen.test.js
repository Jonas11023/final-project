import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { act } from "react-test-renderer";
import HomeScreen from "../../components/HomeScreen";
import { ModeProvider } from "../../context/ModeContext";
import { AutoLiveProvider } from "../../context/AutoLiveContext";
import * as firebaseConfig from "../../components/firebaseConfig";

// Mock navigation
const navigation = { navigate: jest.fn() };

// Mock firebase
jest.mock("../../components/firebaseConfig", () => ({
  auth: {
    currentUser: { displayName: "Test User" },
    signOut: jest.fn(() => Promise.resolve()),
  },
  firestore: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ data: () => ({}) })),
        set: jest.fn(() => Promise.resolve()),
      })),
    })),
  },
  FieldValue: { serverTimestamp: jest.fn(() => "mocked-timestamp") },
}));

// Mock RainfallUtils
jest.mock("../../components/RainfallUtils", () => ({
  fetchRainfall: jest.fn(() =>
    Promise.resolve({ north: 25, south: 10, east: 0, west: 0, central: 0 })
  ),
}));

// Helper to wrap providers
const renderWithProviders = (ui) =>
  render(
    <ModeProvider>
      <AutoLiveProvider>{ui}</AutoLiveProvider>
    </ModeProvider>
  );

describe("HomeScreen Integration", () => {
  it("renders HomeScreen correctly with rainfall section", async () => {
    const { getByText, getAllByText } = renderWithProviders(<HomeScreen navigation={navigation} />);

    // Wait for Rainfall heading
    await waitFor(() => expect(getByText(/Rainfall/i)).toBeTruthy());

    // Wait for at least one numeric value to appear (simulated rainfall)
    await waitFor(() => {
      const numbers = getAllByText(/\d+/); // any text with digits
      expect(numbers.length).toBeGreaterThan(0);
    });
  });
});
