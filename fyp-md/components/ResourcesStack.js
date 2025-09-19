import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResourcesScreen from "./ResourcesScreen";
import EmergencyHotlines from "./EmergencyHotlines";

const Stack = createNativeStackNavigator();

export default function ResourcesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0A0F3D" },
        headerTintColor: "#fff",
        headerShown: false // Hide header for all screens by default
      }}
    >
      <Stack.Screen 
        name="ResourcesMain" 
        component={ResourcesScreen} 
        options={{ 
          title: "Resources",
          headerShown: false // Show header only for this screen
        }} 
      />
      <Stack.Screen 
        name="EmergencyHotlines" 
        component={EmergencyHotlines} 
        options={{ 
          title: "Emergency Hotlines",
          headerShown: false // Show header for this screen too
        }} 
      />
    </Stack.Navigator>
  );
}