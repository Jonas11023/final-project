import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SectionCard({ title, description, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E2761",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    width: "100%",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardText: {
    color: "#ddd",
    fontSize: 16,
  },
});
