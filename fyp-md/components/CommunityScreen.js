import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useMode } from "../context/ModeContext";
import firebase, { auth } from "./firebaseConfig"; // v8 config

export default function CommunityScreen() {
  const { mode } = useMode();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const db = firebase.firestore();

  // Fetch contacts for the logged-in user
  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = db
      .collection("contacts")
      .where("userId", "==", auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        setContacts(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });

    return unsubscribe;
  }, []);

  const handleAddOrUpdateContact = async () => {
    if (!name.trim() || !phone.trim()) return;

    try {
      if (editingId) {
        // ✅ Only allow updating fields that are safe (not userId)
        await db.collection("contacts").doc(editingId).update({
          name,
          phone,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setEditingId(null);
      } else {
        // ✅ Always attach userId on create
        const docRef = await db.collection("contacts").add({
          userId: auth.currentUser.uid,
          name,
          phone,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setContacts([...contacts, { id: docRef.id, name, phone }]);
      }
      setName("");
      setPhone("");
    } catch (err) {
      console.error("Error saving contact:", err);
      Alert.alert("Error", "Failed to save contact. Please try again.");
    }
  };

  const handleEdit = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditingId(contact.id);
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Contact", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await db.collection("contacts").doc(id).delete();
            setContacts((prev) => prev.filter((c) => c.id !== id));
          } catch (err) {
            console.error("Error deleting contact:", err);
            Alert.alert("Error", "Failed to delete contact.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community</Text>
      <Text style={styles.text}>
        Share updates with neighbours. Current mode: {mode.toUpperCase()}
      </Text>

      {/* Add/Update form */}
      <TextInput
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddOrUpdateContact}>
        <Text style={styles.buttonText}>
          {editingId ? "Update Contact" : "Add Contact"}
        </Text>
      </TouchableOpacity>

      {/* Contacts list */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.contactText}>{item.name}</Text>
              <Text style={styles.contactText}>{item.phone}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => handleEdit(item)}
                style={styles.editButton}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F3D",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 8 },
  text: { color: "#ddd", marginBottom: 16 },
  input: {
    backgroundColor: "#1B224A",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
    width: "100%",
  },
  contactText: { color: "#fff" },
  actions: { flexDirection: "row" },
  editButton: { marginRight: 10 },
  actionText: { color: "#4A90E2", fontWeight: "600" },
});
