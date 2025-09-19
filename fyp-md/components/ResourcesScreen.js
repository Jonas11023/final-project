import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ResourcesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resources</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("EmergencyHotlines")}
      >
        <Text style={styles.btnText}>Emergency Hotlines</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F3D", alignItems: "center", justifyContent: "center", padding: 16 },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 16 },
  btn: { backgroundColor: "#1E2761", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  btnText: { color: "#fff", fontWeight: "700" },
});
