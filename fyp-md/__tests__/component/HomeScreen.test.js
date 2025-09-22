import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../../components/HomeScreen";
import { auth } from "../../components/firebaseConfig";

jest.mock("../../components/firebaseConfig", () => ({
  auth: { currentUser: { displayName: "Test User" }, signOut: jest.fn() },
}));

jest.mock("../../context/ModeContext", () => ({
  useMode: () => ({ mode: "drill", setMode: jest.fn() }),
}));

jest.mock("../../context/AutoLiveContext", () => ({
  useAutoLive: () => ({ autoLive: false, setAutoLive: jest.fn() }),
}));

describe("HomeScreen Component", () => {
  const navigation = { replace: jest.fn(), navigate: jest.fn() };

  it("renders the welcome message", () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);
    expect(getByText("Welcome back Test User!")).toBeTruthy();
  });

  it("logout button calls auth.signOut", () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);
    fireEvent.press(getByText("Logout"));
    expect(auth.signOut).toHaveBeenCalled();
  });
});