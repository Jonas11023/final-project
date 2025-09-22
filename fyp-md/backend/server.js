// backend/server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // Allow requests from any origin

const PORT = 3000;

// Endpoint to get rainfall data
app.get("/rainfall", async (req, res) => {
  try {
    const response = await fetch(
      "https://api-open.data.gov.sg/v2/real-time/api/rainfall"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log("Error fetching rainfall:", err.message);

    // Fallback simulated data
    const simulatedData = {
      api_info: { status: "simulated" },
      items: [],
      readings: [
        {
          timestamp: new Date().toISOString(),
          data: [
            { stationId: "S81", value: 12.3 },
            { stationId: "S92", value: 5.2 },
            { stationId: "S214", value: 18.5 },
            { stationId: "S203", value: 23.1 },
            { stationId: "S219", value: 25.0 },
            { stationId: "S117", value: 2.4 },
            { stationId: "S216", value: 15.2 },
            { stationId: "S107", value: 6.8 },
            { stationId: "S201", value: 7.9 },
            { stationId: "S221", value: 10.5 },
          ],
        },
      ],
    };

    res.json(simulatedData);
  }
});

app.listen(PORT, () =>
  console.log(`Backend server running on http://192.168.1.71:${PORT}`)
);
