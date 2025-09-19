import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmergencyHotlines({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Emergency Hotlines</Text>
      <Text style={styles.line}>Police: 999</Text>
      <Text style={styles.line}>Ambulance: 995</Text>
      <Text style={styles.line}>
        Singapore Civil Defence Force (SCDF) Hotline: 1800-280-0000
      </Text>
      <Text style={styles.line}>
        Public Utilities and Flooding Issues (PUB - Singapore's Water Agency): 1800-225-0000
      </Text>
      <Text style={styles.line}>
        SP Group (Electricity / Gas Emergencies): 1800-778-8888
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F3D",
    padding: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 16 },
  line: { color: "#ddd", marginBottom: 6, fontSize: 16 },
});