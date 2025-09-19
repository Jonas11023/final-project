// App.js
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { ModeProvider, useMode } from "./context/ModeContext";
import { AutoLiveProvider, useAutoLive } from "./context/AutoLiveContext";
import * as Notifications from "expo-notifications";
import useNotifications from "./hooks/Notifications";

// Auth screens
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/Register";
import ResetPasswordScreen from "./components/ResetPassword";

// Tabs & stacks
import HomeScreen from "./components/HomeScreen";
import TrainingStack from "./components/TrainingStack";
import EmergencyStack from "./components/EmergencyStack";
import CommunityScreen from "./components/CommunityScreen";
import ResourcesStack from "./components/ResourcesStack";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Handle notifications when app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const ModeSwitcher = () => {
  const { autoLive } = useAutoLive();
  const { mode, setMode } = useMode();
  const isDrill = mode === "drill";

  return (
    <View style={styles.modeContainer}>
      <TouchableOpacity
        onPress={() => !autoLive && setMode("drill")}
        style={[
          styles.modeBtn, 
          isDrill && styles.modeBtnActiveDrill,
          autoLive && styles.modeBtnDisabled
        ]}
        disabled={autoLive}
      >
        <Text style={[
          styles.modeText,
          autoLive && !isDrill && styles.modeTextDisabled
        ]}>Drill</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => !autoLive && setMode("live")}
        style={[
          styles.modeBtn, 
          !isDrill && styles.modeBtnActiveLive,
          autoLive && styles.modeBtnDisabled
        ]}
        disabled={autoLive}
      >
        <Text style={[
          styles.modeText,
          autoLive && isDrill && styles.modeTextDisabled
        ]}>Live</Text>
      </TouchableOpacity>
    </View>
  );
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => <ModeSwitcher />,
        headerStyle: { backgroundColor: "#0A0F3D" },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#0A0F3D" },
        tabBarActiveTintColor: "#FF5E3A",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let icon = "ellipse";
          if (route.name === "Home") icon = "home-outline";
          if (route.name === "Training") icon = "book-outline";
          if (route.name === "Emergency") icon = "warning-outline";
          if (route.name === "Community") icon = "people-outline";
          if (route.name === "Resources") icon = "folder-open-outline";
          return <Ionicons name={icon} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Training" component={TrainingStack} />
      <Tab.Screen name="Emergency" component={EmergencyStack} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Resources" component={ResourcesStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // ✅ Schedule daily notifications
  useNotifications();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthedUser(user || null);
      setChecking(false);
    });
    return unsub;
  }, []);

  // ✅ Notification listeners (optional: logs when received or tapped)
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(
          "Notification received:",
          notification.request.content.title,
          notification.request.content.body
        );
      }
    );

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification tapped:", response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  if (checking) return null;

  return (
    <ModeProvider>
      <AutoLiveProvider>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {authedUser ? (
              <RootStack.Screen name="MainTabs" component={MainTabs} />
            ) : (
              <>
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen name="Register" component={RegisterScreen} />
                <RootStack.Screen
                  name="ResetPassword"
                  component={ResetPasswordScreen}
                />
              </>
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </AutoLiveProvider>
    </ModeProvider>
  );
}

const styles = StyleSheet.create({
  modeContainer: { flexDirection: "row", marginRight: 10 },
  modeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 6,
    backgroundColor: "#3B3F73",
  },
  modeBtnActiveDrill: { backgroundColor: "#2ecc71" },
  modeBtnActiveLive: { backgroundColor: "#e74c3c" },
  modeBtnDisabled: {
    opacity: 0.6,
  },
  modeText: { color: "#fff", fontWeight: "600" },
  modeTextDisabled: {
    opacity: 0.7,
  },
});