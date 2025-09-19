import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // for back arrow

export default function EvacuationGuide({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Custom Back Button */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Evacuation Guide</Text>
        <Text style={styles.text}>In case of emergency, follow these steps:</Text>
        <Text style={styles.text}>1. Stay calm and do not panic.</Text>
        <Text style={styles.text}>2. Follow instructions from authorities.</Text>
        <Text style={styles.text}>3. Use designated evacuation routes.</Text>
        <Text style={styles.text}>4. Assist children, elderly and people with disabilities.</Text>
        <Text style={styles.text}>5. Do not use lifts during fire emergencies.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F3D",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1E2761",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#f0f0f0",
    marginBottom: 8,
  },
});