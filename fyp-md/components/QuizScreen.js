import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { questions } from "./QuizCard";
import firebase, { auth } from "./firebaseConfig";

// Helper: sanitize module names for Firestore
const sanitizeModuleName = (moduleName) => {
  return moduleName
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w-]/g, "");
};

export default function QuizScreen({ navigation, route }) {
  const { mode = "drill", duration = 15, module = "Flood Safety" } = route.params || {};
  const moduleId = sanitizeModuleName(module);

  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const db = firebase.firestore();

  const handleAnswer = async (selectedIndex) => {
    if (quizFinished) return;
    setQuizFinished(true);

    const currentQuestionPoints =
      selectedIndex !== null && selectedIndex === questions[currentQuestion].correctIndex
        ? questions[currentQuestion].points
        : 0;

    const newScore = score + currentQuestionPoints;
    setScore(newScore);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(duration);
      setQuizFinished(false);
    } else {
      // Save result to Firestore
      if (auth.currentUser) {
        try {
          const docRef = await db
            .collection("quizResults")
            .doc(moduleId)
            .collection("attempts")
            .add({
              userId: auth.currentUser.uid,
              score: newScore,
              totalPoints,
              mode,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

          navigation.replace("QuizResult", {
            module,
            moduleId,
            score: newScore,
            totalPoints,
            mode,
            attemptId: docRef.id,
          });
        } catch (err) {
          console.error("Error saving quiz result:", err);
          navigation.replace("QuizResult", {
            module,
            moduleId,
            score: newScore,
            totalPoints,
            mode,
          });
        }
      } else {
        navigation.replace("QuizResult", {
          module,
          moduleId,
          score: newScore,
          totalPoints,
          mode,
        });
      }
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {module} Quiz ({mode.toUpperCase()})
      </Text>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>

      <View style={styles.questionBox}>
        <Text style={styles.questionText}>
          {questions[currentQuestion].question}
        </Text>
        {questions[currentQuestion].options.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.optionButton}
            onPress={() => handleAnswer(idx)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F3D", padding: 20, justifyContent: "center" },
  title: { fontSize: 22, color: "#fff", fontWeight: "700", marginBottom: 20, textAlign: "center" },
  timer: { fontSize: 20, color: "#FF5E3A", fontWeight: "600", marginBottom: 20, textAlign: "center" },
  questionBox: { backgroundColor: "#1E2761", padding: 15, borderRadius: 12, marginBottom: 20 },
  questionText: { color: "#fff", fontSize: 16, marginBottom: 10 },
  optionButton: { backgroundColor: "#FF6B6B", padding: 10, borderRadius: 8, marginVertical: 5 },
  optionText: { color: "#fff", fontSize: 16, textAlign: "center" },
});
