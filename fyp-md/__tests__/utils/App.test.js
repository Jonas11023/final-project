import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import useNotifications from "../../hooks/Notifications";

jest.mock("expo-notifications", () => ({
  requestPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  scheduleNotificationAsync: jest.fn(() =>
    Promise.resolve({ identifier: "test-id" })
  ),
  cancelAllScheduledNotificationsAsync: jest.fn(() => Promise.resolve()),
  setNotificationHandler: jest.fn(),
  addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  removeNotificationSubscription: jest.fn(),
}));

function TestComponent() {
  useNotifications();
  return null;
}

describe("useNotifications hook", () => {
  it("schedules a daily notification", async () => {
    render(<TestComponent />);
    await waitFor(() =>
      expect(
        require("expo-notifications").scheduleNotificationAsync
      ).toHaveBeenCalled()
    );
  });

  it("cancels notifications before scheduling new ones", async () => {
    render(<TestComponent />);
    await waitFor(() =>
      expect(
        require("expo-notifications").cancelAllScheduledNotificationsAsync
      ).toHaveBeenCalled()
    );
  });
});