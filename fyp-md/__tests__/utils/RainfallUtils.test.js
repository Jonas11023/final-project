import { calculateLatestRainfall, generateAlerts } from "../../components/RainfallUtils";

describe("Rainfall Utils", () => {
  const readings = [
    { stationId: "S81", value: 25 },
    { stationId: "S92", value: 10 },
  ];
  const stationsByRegion = { north: ["S81", "S999"], south: ["S92"] };

  it("calculates latest rainfall per region correctly", () => {
    const latest = calculateLatestRainfall(readings, stationsByRegion);
    expect(latest).toEqual({ north: 25, south: 10 });
  });

  it("generates alerts correctly for threshold exceedance", () => {
    const latest = { north: 25, south: 10 };
    const alerts = generateAlerts(latest, 20);
    expect(alerts).toEqual([
      {
        title: "Heavy Rainfall Alert",
        description: "25.0mm rain detected in the past hour.",
        location: "North",
        severity: "high",
      },
    ]);
  });
});