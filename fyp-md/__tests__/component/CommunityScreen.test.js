import React from "react";
import { render } from "@testing-library/react-native";
import CommunityScreen from "../../components/CommunityScreen";
import { useMode } from "../../context/ModeContext";

// Mock context
jest.mock("../../context/ModeContext", () => ({
  useMode: jest.fn(),
}));

// Mock firebase (with firestore() returning a fake db)
jest.mock("../../components/firebaseConfig", () => ({
  __esModule: true,
  default: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        where: jest.fn(() => ({
          onSnapshot: jest.fn((cb) => {
            cb({ docs: [] }); // fake snapshot (no contacts)
            return jest.fn(); // fake unsubscribe
          }),
        })),
      })),
    })),
  },
  auth: { currentUser: { uid: "user123" } },
}));

describe("CommunityScreen (Component)", () => {
  it("renders title and current mode", () => {
    useMode.mockReturnValue({ mode: "safe" });

    const { getByText } = render(<CommunityScreen />);
    expect(getByText("Community")).toBeTruthy();
    expect(getByText(/Current mode: SAFE/i)).toBeTruthy();
  });
});
