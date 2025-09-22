import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import TrainingScreen from "../../components/TrainingScreen";

// Optionally mock useFocusEffect to avoid side effects
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useFocusEffect: jest.fn((cb) => cb()),
  };
});

describe("TrainingScreen Integration", () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderWithNavigation(ui) {
    return render(
      <NavigationContainer>
        {React.cloneElement(ui, { navigation })}
      </NavigationContainer>
    );
  }

  it("navigates to FloodSafety from list item", () => {
    const { getByText } = renderWithNavigation(<TrainingScreen />);
    fireEvent.press(getByText("Flood Safety"));
    expect(navigation.navigate).toHaveBeenCalledWith("FloodSafety");
  });

  it("navigates to FirstAidBasics from list item", () => {
    const { getByText } = renderWithNavigation(<TrainingScreen />);
    fireEvent.press(getByText("First Aid Basics"));
    expect(navigation.navigate).toHaveBeenCalledWith("FirstAidBasics");
  });

  it("navigates to Quiz with params", () => {
    const { getByText } = renderWithNavigation(<TrainingScreen />);
    fireEvent.press(getByText("Take Quiz"));
    expect(navigation.navigate).toHaveBeenCalledWith("Quiz", {
      mode: "drill",
      duration: 15,
      module: "Flood Safety",
    });
  });

  it("navigates to QuizResult", () => {
    const { getByText } = renderWithNavigation(<TrainingScreen />);
    fireEvent.press(getByText("View Results"));
    expect(navigation.navigate).toHaveBeenCalledWith("QuizResult", {
      module: "Flood Safety",
    });
  });
});