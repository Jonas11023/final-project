// EmergencyStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmergencyScreen from "./EmergencyScreen";
import EvacuationKitScreen from "./EvacuationKitScreen";
import EvacuationGuide from "./EvacuationGuide";

const Stack = createNativeStackNavigator(); 

export default function EmergencyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0A0F3D" },
        headerTintColor: "#fff",
        headerShown: false, // hide default header
      }}
    >
      <Stack.Screen name="EmergencyMain" component={EmergencyScreen} />
      <Stack.Screen name="EvacuationKit" component={EvacuationKitScreen} />
      <Stack.Screen name="EvacuationGuide" component={EvacuationGuide} />
    </Stack.Navigator>
  );
}
