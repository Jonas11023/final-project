// TrainingStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrainingScreen from "./TrainingScreen";
import QuizScreen from "./QuizScreen";
import QuizResult from "./QuizResult";
import FloodSafety from "./FloodSafety";
import FirstAidBasics from "./FirstAidBasics";

const Stack = createNativeStackNavigator();

export default function TrainingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0A0F3D" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="TrainingMain"
        component={TrainingScreen}
        options={{
          title: "Training",
          headerShown: false, // Hide header ONLY here
        }}
      />
      <Stack.Screen 
        name="FloodSafety" 
        component={FloodSafety}
        options={{
          title: "Flood Safety",
          headerShown: false, // Hide header ONLY here
        }}
      />
      <Stack.Screen 
        name="FirstAidBasics" 
        component={FirstAidBasics}
        options={{
          title: "First Aid Basics",
          headerShown: false, // Hide header ONLY here
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: "Quiz" }} // header visible
      />
      <Stack.Screen
        name="QuizResult"
        component={QuizResult}
        options={{ title: "Quiz Result" }} // header visible
      />
    </Stack.Navigator>
  );
}
