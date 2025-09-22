export const calculateLatestRainfall = (readings, stationsByRegion) => {
  const latest = {};
  for (const [region, stationIds] of Object.entries(stationsByRegion)) {
    const regionRainfall = stationIds
      .map((id) => readings.find((r) => r.stationId === id)?.value)
      .filter((val) => val !== undefined);
    latest[region] = regionRainfall.length ? Math.max(...regionRainfall) : 0;
  }
  return latest;
};

export const generateAlerts = (latest, threshold = 23) => {
  return Object.entries(latest)
    .filter(([_, mm]) => mm >= threshold)
    .map(([region, mm]) => ({
      title: "Heavy Rainfall Alert",
      description: `${mm.toFixed(1)}mm rain detected in the past hour.`,
      location: region.charAt(0).toUpperCase() + region.slice(1),
      severity: mm >= 20 ? "high" : "medium",
    }));
};