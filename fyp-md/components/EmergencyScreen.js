import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SectionScreen from "./SectionScreen";
import { useMode } from "../context/ModeContext";

const emergencyData = [
  { id: "e1", title: "Evacuation Guide", description: "How to safely evacuate" },
  { id: "e2", title: "Evacuation Kit", description: "What to bring in case of disaster" },
];

export default function EmergencyScreen({ navigation }) {
  const { mode } = useMode();

  const handleItemPress = (item) => {
    if (item.title === "Evacuation Kit") {
      navigation.navigate("EvacuationKit");
    } else if (item.title === "Evacuation Guide") {
      navigation.navigate("EvacuationGuide");
    } else {
      console.log("Emergency item:", item.title);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Mode: <Text style={{ color: mode === "drill" ? "#2ecc71" : "#e74c3c" }}>{mode.toUpperCase()}</Text>
        </Text>
      </View>

      <SectionScreen data={emergencyData} onItemPress={handleItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F3D" },
  banner: { padding: 12, backgroundColor: "#1E2761" },
  bannerText: { color: "#fff", fontWeight: "700" },
});
