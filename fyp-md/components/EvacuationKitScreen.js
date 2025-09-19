import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const evacuationItems = [
  { id: "i1", name: "Water (4 liters per person per day for 3 days)" },
  { id: "i2", name: "Non-perishable food for 3 days" },
  { id: "i3", name: "First aid kit" },
  { id: "i4", name: "Flashlight" },
  { id: "i5", name: "Important documents in zip-lock bags" },
  { id: "i6", name: "Clothing & Sleeping bags" },
  { id: "i7", name: "Hygiene items" },
  { id: "i8", name: "Mobile phone & charger" },
  { id: "i9", name: "Battery-powered or hand crank radio" },
  { id: "i10", name: "Extra batteries" },
  { id: "i11", name: "Whistle to seek help" },
  { id: "i12", name: "Plastic sheets and duct tape" },
  { id: "i13", name: "Dust masks" },
  { id: "i14", name: "Moist toiletries, towelettes and garbage bags" },
  { id: "i15", name: "Wrench or pliers to turn off utilities" },
  { id: "i16", name: "Manual can opener" },
  { id: "i17", name: "Local maps" },
  { id: "i18", name: "Cash or traveler's checks" },
  { id: "i19", name: "Fire extinguisher" },
  { id: "i20", name: "Matches in waterproof container" },
];

export default function EvacuationKitScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Evacuation Kit Essentials</Text>

      <FlatList
        data={evacuationItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>• {item.name}</Text>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F3D", padding: 16 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backText: { color: "#fff", fontSize: 16, marginLeft: 6 },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 12 },
  list: { marginTop: 10 },
  item: { paddingVertical: 6 },
  itemText: { color: "#fff", fontSize: 16 },
});