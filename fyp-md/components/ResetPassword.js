import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setMessage("Password reset email sent!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
      />
      <Button title="Send Reset Email" onPress={handleReset} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  message: { color: "green", marginBottom: 10, textAlign: "center" },
});
