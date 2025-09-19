import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import firebase, { auth } from "./firebaseConfig";

// Helper: sanitize module names
const sanitizeModuleName = (moduleName) => {
  return moduleName
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w-]/g, "");
};

export default function QuizResult({ navigation, route }) {
  const { module, moduleId } = route.params || {};
  const sanitizedId = moduleId || sanitizeModuleName(module || "DefaultModule");

  const [currentAttempt, setCurrentAttempt] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttempts = async () => {
    const user = auth.currentUser;
    if (!user) return setError("No user logged in"), setLoading(false);
    if (!sanitizedId) return setError("Invalid module"), setLoading(false);

    try {
      setLoading(true);
      const snapshot = await firebase
        .firestore()
        .collection("quizResults")
        .doc(sanitizedId)
        .collection("attempts")
        .where("userId", "==", user.uid)
        .orderBy("timestamp", "desc")
        .get();

      const attempts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          score: data.score || 0,
          totalPoints: data.totalPoints || 100,
          mode: data.mode || "",
          timestamp: data.timestamp?.toDate?.() || new Date(),
        };
      });

      setHistory(attempts);
      setCurrentAttempt(attempts[0] || null);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setHistory([]);
      setCurrentAttempt(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, [sanitizedId]);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading results...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TrainingMain")}>
          <Text style={styles.buttonText}>Back to Training</Text>
        </TouchableOpacity>
      </View>
    );

  if (!currentAttempt)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No quiz attempts yet for {module}.</Text>
        <Text style={styles.subtitle}>Complete a quiz first to see results.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TrainingMain")}>
          <Text style={styles.buttonText}>Back to Training</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#4CAF50" }]} onPress={() => navigation.navigate("Quiz", { module })}>
          <Text style={styles.buttonText}>Take Quiz Now</Text>
        </TouchableOpacity>
      </View>
    );

  const percentage = (currentAttempt.score / currentAttempt.totalPoints) * 100;
  let feedback = "";
  if (percentage === 100) feedback = "Excellent! Perfect score!";
  else if (percentage >= 70) feedback = "Great job! Keep practicing.";
  else if (percentage >= 50) feedback = "Good effort! Review and try again.";
  else feedback = "Needs improvement. Study the material and retry.";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{module} Quiz Results</Text>
      <Text style={styles.scoreText}>
        You scored {currentAttempt.score} out of {currentAttempt.totalPoints} points ({percentage.toFixed(1)}%)
      </Text>
      <Text style={styles.feedback}>{feedback}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TrainingMain")}>
        <Text style={styles.buttonText}>Back to Training</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#4CAF50" }]} onPress={() => navigation.navigate("Quiz", { module })}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Past Attempts:</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>
              Attempt {history.length - index}: {item.score}/{item.totalPoints} points ({item.mode})
            </Text>
            <Text style={styles.historyText}>{item.timestamp.toLocaleString()}</Text>
          </View>
        )}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F3D", padding: 20, alignItems: "center" },
  title: { fontSize: 24, color: "#fff", fontWeight: "700", marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#ccc", marginBottom: 20, textAlign: "center" },
  scoreText: { fontSize: 20, color: "#FF5E3A", marginBottom: 10, textAlign: "center" },
  feedback: { fontSize: 18, color: "#fff", marginBottom: 30, textAlign: "center" },
  button: { backgroundColor: "#FF6B6B", padding: 12, borderRadius: 10, marginBottom: 10, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  historyTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 10, alignSelf: "flex-start" },
  historyItem: { backgroundColor: "#1E2761", padding: 10, borderRadius: 8, marginBottom: 8, width: "100%" },
  historyText: { color: "#fff" },
  loadingText: { color: "#fff", marginTop: 10 },
  errorText: { color: "#FF5252", fontSize: 16, marginBottom: 20, textAlign: "center" },
  flatList: { width: "100%", marginTop: 10 },
});
