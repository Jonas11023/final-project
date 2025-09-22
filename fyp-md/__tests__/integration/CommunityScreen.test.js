// Must mock before importing component
jest.mock('../../components/firebaseConfig');

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CommunityScreen from "../../components/CommunityScreen";
import { useMode } from "../../context/ModeContext";

// Mock ModeContext
jest.mock("../../context/ModeContext", () => ({
  useMode: jest.fn(() => ({ mode: "safe" })),
}));

describe("CommunityScreen (Integration)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and current mode", () => {
    const { getByText } = render(<CommunityScreen />);
    expect(getByText("Community")).toBeTruthy();
    expect(getByText(/Current mode: SAFE/i)).toBeTruthy();
  });

  it("loads contacts from Firestore", () => {
    const { getByText } = render(<CommunityScreen />);
    expect(getByText("Test User")).toBeTruthy();
    expect(getByText("12345678")).toBeTruthy();
  });

  it("deletes a contact", async () => {
    const { getByText } = render(<CommunityScreen />);
    const mockAlert = jest.spyOn(require("react-native"), "Alert");
    mockAlert.alert = jest.fn((title, msg, buttons) => {
      const deleteBtn = buttons.find((b) => b.text === "Delete");
      deleteBtn.onPress();
    });

    fireEvent.press(getByText("Delete"));

    const firebase = require("../../components/firebaseConfig").default;

    await waitFor(() => {
      expect(firebase.firestore().collection().doc().delete).toHaveBeenCalled();
    });
  });
});
