// __tests__/utils/TrainingScreen.test.js
import { handleTrainingItemPress } from "../../components/TrainingScreen";

describe("handleTrainingItemPress", () => {
  let navigation;

  beforeEach(() => {
    navigation = { navigate: jest.fn() };
  });

  it("navigates to FloodSafety when Flood Safety is pressed", () => {
    const item = { title: "Flood Safety" };
    handleTrainingItemPress(item, navigation);
    expect(navigation.navigate).toHaveBeenCalledWith("FloodSafety");
  });

  it("navigates to FirstAidBasics when First Aid Basics is pressed", () => {
    const item = { title: "First Aid Basics" };
    handleTrainingItemPress(item, navigation);
    expect(navigation.navigate).toHaveBeenCalledWith("FirstAidBasics");
  });

  it("does nothing for unknown items", () => {
    const item = { title: "Unknown Training" };
    handleTrainingItemPress(item, navigation);
    expect(navigation.navigate).not.toHaveBeenCalled();
  });
});
