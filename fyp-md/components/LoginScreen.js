import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don’t have an account? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 24, 
    backgroundColor: "#f9f9f9" 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "700", 
    marginBottom: 6, 
    textAlign: "center", 
    color: "#333" 
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: "center", 
    marginBottom: 20, 
    color: "#666" 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    marginBottom: 15, 
    padding: 12, 
    borderRadius: 10, 
    fontSize: 16, 
    backgroundColor: "#fff", 
    elevation: 2 
  },
  button: { 
    backgroundColor: "#007AFF", 
    paddingVertical: 14, 
    borderRadius: 10, 
    marginBottom: 16, 
    alignItems: "center", 
    elevation: 3 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  link: { 
    fontSize: 14, 
    color: "#007AFF", 
    textAlign: "center", 
    marginTop: 8 
  },
  error: { 
    color: "red", 
    marginBottom: 12, 
    textAlign: "center" 
  },
});
