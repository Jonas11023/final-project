// __tests__/component/TrainingScreen.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TrainingScreen from "../../components/TrainingScreen";

// Mock SectionScreen
jest.mock("../../components/SectionScreen", () => {
  const React = require("react");
  const { Text, TouchableOpacity } = require("react-native");
  return ({ onItemPress }) => (
    <>
      <TouchableOpacity onPress={() => onItemPress({ title: "Flood Safety" })}>
        <Text>Flood Safety</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onItemPress({ title: "First Aid Basics" })}>
        <Text>First Aid Basics</Text>
      </TouchableOpacity>
    </>
  );
});

// Mock React Navigation focus hook
jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn((cb) => cb()), // just run callback immediately
}));

describe("TrainingScreen Component", () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls navigation when Flood Safety is pressed", () => {
    const { getByText } = render(<TrainingScreen navigation={navigation} />);
    fireEvent.press(getByText("Flood Safety"));
    expect(navigation.navigate).toHaveBeenCalledWith("FloodSafety");
});

  it("calls navigation when First Aid Basics is pressed", () => {
    const { getByText } = render(<TrainingScreen navigation={navigation} />);
    fireEvent.press(getByText("First Aid Basics"));
    expect(navigation.navigate).toHaveBeenCalledWith("FirstAidBasics");
});
});
