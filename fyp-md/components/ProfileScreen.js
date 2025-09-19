import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase";

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF5E3A" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{userData.email}</Text>
      <Text style={styles.label}>Member since:</Text>
      <Text style={styles.text}>
        {userData.createdAt
          ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString()
          : "N/A"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F3D",
    padding: 20,
  },
  center: {
    flex: 1,
    backgroundColor: "#0A0F3D",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 25,
  },
  label: {
    color: "#FF5E3A",
    fontWeight: "700",
    fontSize: 18,
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
