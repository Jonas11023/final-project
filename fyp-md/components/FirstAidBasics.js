import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FirstAidBasics({ navigation }) {
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
        <Text style={styles.header}>First Aid Basics</Text>
        <Text style={styles.text}>1. Call for help immediately in emergencies.</Text>
        <Text style={styles.text}>2. Check the scene for safety before assisting.</Text>
        <Text style={styles.text}>3. Perform CPR if the person is unresponsive and not breathing.</Text>
        <Text style={styles.text}>4. Stop bleeding by applying pressure to wounds.</Text>
        <Text style={styles.text}>5. Treat burns with cool water, not ice.</Text>
        <Text style={styles.text}>6. Stay with the injured person until help arrives.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F3D" },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1E2761",
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#fff", marginLeft: 6, fontSize: 16, fontWeight: "600" },
  content: { padding: 16 },
  header: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 12 },
  text: { fontSize: 16, color: "#f0f0f0", marginBottom: 8 },
});
