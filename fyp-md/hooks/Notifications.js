// Notifications.js
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useEffect } from "react";

export default function useNotifications() {
  useEffect(() => {
    (async () => {
      // Ask for permissions
      const { status } = await Notifications.requestPermissionsAsync({
        ios: { allowAlert: true, allowSound: true, allowBadge: true },
      });
      if (status !== "granted") {
        console.warn("Notification permission not granted!");
        return;
      }

      // Android channel setup
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
          sound: "default",
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      // Cancel any existing scheduled notifications
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Schedule daily notification at 9:00 AM
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🌧️ Flood Safety Reminder",
          body: "Stay alert and check flood updates in your area.",
          sound: "default",
        },
        trigger: { seconds: 5, repeats: false },
        android: { channelId: "default" },
      });
    })();
  }, []);
}
