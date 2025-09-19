import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FloodSafety({ navigation }) {
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
        <Text style={styles.header}>Flood Safety</Text>
        <Text style={styles.text}>1. Move to higher ground immediately.</Text>
        <Text style={styles.text}>2. Avoid walking or driving through floodwaters.</Text>
        <Text style={styles.text}>3. Disconnect electrical appliances if safe to do so.</Text>
        <Text style={styles.text}>4. Listen to emergency broadcasts for updates.</Text>
        <Text style={styles.text}>5. Prepare an emergency kit with water, food and essentials.</Text>
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
