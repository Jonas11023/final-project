import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SectionScreen({ data = [], onItemPress, footer }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, idx) => item.id ?? item.title ?? String(idx)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onItemPress?.(item)}
            activeOpacity={onItemPress ? 0.7 : 1}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              {item.description ? (
                <Text style={styles.desc}>{item.description}</Text>
              ) : null}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        ListFooterComponent={footer ?? null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F3D" },
  item: {
    backgroundColor: "#1E2761",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  title: { color: "#fff", fontWeight: "700", fontSize: 16 },
  desc: { color: "#ccc", marginTop: 4 },
});
