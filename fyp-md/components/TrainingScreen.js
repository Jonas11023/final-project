// TrainingScreen.js
import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SectionScreen from "./SectionScreen";

const trainingData = [
  { id: "1", title: "Flood Safety", description: "Learn how to react to floods" },
  { id: "2", title: "First Aid Basics", description: "Emergency first aid training" },
];

export default function TrainingScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      console.log("Training screen focused");
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Training Section List */}
      <SectionScreen
        data={trainingData}
        onItemPress={(item) => {
          if (item.title === "Flood Safety") {
            navigation.navigate("FloodSafety");
          } else if (item.title === "First Aid Basics") {
            navigation.navigate("FirstAidBasics");
          }
        }}
      />

      {/* Quiz Section */}
      <View style={styles.quizContainer}>
        <Text style={styles.quizTitle}>Test Your Knowledge</Text>

        <TouchableOpacity
          style={styles.quizButton}
          onPress={() =>
            navigation.navigate("Quiz", {
              mode: "drill",
              duration: 15, 
              module: "Flood Safety",
            })
          }
        >
          <Text style={styles.quizButtonText}>Take Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.quizButton, { backgroundColor: "#6C63FF" }]}
          onPress={() => navigation.navigate("QuizResult", { module: "Flood Safety" })}
        >
          <Text style={styles.quizButtonText}>View Results</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  quizContainer: {
    marginTop: 20,
    padding: 20,
    alignItems: "center",
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  quizButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  quizButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
