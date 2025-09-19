// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { auth } from "../components/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useMode } from "../context/ModeContext";
import { useAutoLive } from "../context/AutoLiveContext";

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser || { displayName: "Test User" };
  const { mode, setMode } = useMode();
  const { autoLive, setAutoLive } = useAutoLive();
  const [rainfall, setRainfall] = useState(null);
  const [rainfallAlerts, setRainfallAlerts] = useState([]);

  const RAINFALL_THRESHOLD = 23;

  const onLogout = async () => {
    try {
      await auth.signOut();
      Alert.alert("Logged out", "You have successfully logged out.");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", "Error logging out: " + error.message);
    }
  };

  // Simulated rainfall fetch
  const fetchRainfall = async () => {
    try {
      const stations = [
        "S81", "S92", "S214", "S203", "S219",
        "S117", "S216", "S107", "S201", "S221",
      ];
      const readings = stations.map((stationId) => ({
        station_id: stationId,
        value: Math.random() * 25,
      }));

      const stationsByRegion = {
        north: ["S81", "S900", "S66", "S08"],
        south: ["S92", "S117", "S115", "S104", "S226"],
        east: ["S214", "S215", "S208", "S24", "S107", "S108", "S113", "S228"],
        west: ["S203", "S201", "S50", "S33", "S229"],
        central: ["S219", "S216", "S217", "S220", "S88", "S43", "S221", "S109"],
      };

      const latest = {};
      for (const [region, stationIds] of Object.entries(stationsByRegion)) {
        const regionRainfall = stationIds
          .map((id) => readings.find((r) => r.station_id === id)?.value)
          .filter((val) => val !== undefined);
        latest[region] = regionRainfall.length ? Math.max(...regionRainfall) : 0;
      }

      setRainfall(latest);

      const maxRain = Math.max(...Object.values(latest));
      if (maxRain >= RAINFALL_THRESHOLD) {
        setMode("live");
        setAutoLive(true);
      } else {
        if (autoLive) setMode("drill");
        setAutoLive(false);
      }

      const alerts = Object.entries(latest)
        .filter(([_, mm]) => mm >= RAINFALL_THRESHOLD)
        .map(([region, mm]) => ({
          title: "Heavy Rainfall Alert",
          description: `${mm.toFixed(1)}mm rain detected in the past hour.`,
          location: region.charAt(0).toUpperCase() + region.slice(1),
          severity: mm >= 20 ? "high" : "medium",
        }));
      setRainfallAlerts(alerts);
    } catch (err) {
      setRainfall({ north: 0, south: 0, east: 0, west: 0, central: 0 });
      setAutoLive(false);
    }
  };

  useEffect(() => {
    fetchRainfall();
    const interval = setInterval(fetchRainfall, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMode = () => {
    if (!autoLive) setMode(mode === "drill" ? "live" : "drill");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0F3D" }}>
      {/* Auto-Live Banner */}
      {autoLive && (
        <View style={styles.autoLiveBanner}>
          <Text style={styles.autoLiveText}>
            LIVE MODE Activated due to heavy rainfall!
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.welcome}>
              Welcome back {user?.displayName || "User"}!
            </Text>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>
            Ready to level up your emergency preparedness?
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <StatBox title="Preparedness Level" value="65%" icon="bar-chart" />
          <StatBox title="Modules Completed" value="2" icon="book" />
          <StatBox title="Emergency Kit Items" value="20" icon="medkit" />
          <StatBox title="Badges Earned" value="3" icon="ribbon" />
        </View>

        {/* Experience Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>Experience Points</Text>
          <Text style={styles.xpText}>875</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Level Progress</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "67.5%" }]} />
            </View>
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>Level 5</Text>
              <Text style={styles.progressText}>875 / 1000 XP</Text>
            </View>
            <Text style={styles.nextLevelText}>125 XP to next level</Text>
          </View>
        </View>

        {/* Mode Toggle */}
        <View style={styles.modeContainer}>
          <Text style={styles.sectionTitle}>Mode: {mode}</Text>
          {!autoLive ? (
            <Switch
              value={mode === "live"}
              onValueChange={toggleMode}
              trackColor={{ false: "#34C759", true: "#FF5E3A" }}
              thumbColor={mode === "live" ? "#FF5E3A" : "#34C759"}
            />
          ) : (
            <Text style={{ color: "#FF5E3A", fontSize: 12 }}>
              Auto-switched due to heavy rainfall
            </Text>
          )}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <QuickAction
            title="Start Learning"
            subtitle="Complete modules to earn XP"
            icon="school"
            onPress={() => navigation.navigate("Training")}
          />
          <QuickAction
            title="Update Kit"
            subtitle="Track your emergency supplies"
            icon="build"
            onPress={() => navigation.navigate("Emergency")}
          />
          <QuickAction
            title="Practice Emergency Tools"
            subtitle="Simulate emergency resources"
            icon="hammer"
            onPress={() => navigation.navigate("Resources")}
          />
          <QuickAction
            title="No Challenge Today"
            subtitle="Check back tomorrow!"
            icon="calendar"
            disabled={true}
          />
        </View>

        {/* Rainfall Card */}
        <View style={styles.rainfallCard}>
          <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 8 }}>
            Rainfall (mm)
          </Text>
          {rainfall ? (
            Object.entries(rainfall).map(([region, mm]) => (
              <Text
                key={region}
                style={{ color: mm >= RAINFALL_THRESHOLD ? "#FF3A3A" : "#a3a3a3" }}
              >
                {region}: {mm.toFixed(1)}
              </Text>
            ))
          ) : (
            <Text style={{ color: "#a3a3a3" }}>Loading...</Text>
          )}
        </View>

        {/* Rainfall Alerts */}
        {rainfallAlerts.map((alert, idx) => (
          <AlertCard key={idx} {...alert} />
        ))}

        {/* Community Stats */}
        <View style={styles.communityCard}>
          <Text style={styles.cardTitle}>Community</Text>
          <View style={styles.communityStats}>
            <View>
              <Text style={styles.communityStatTitle}>Local Preparedness</Text>
              <Text style={styles.communityStatValue}>78%</Text>
            </View>
            <View>
              <Text style={styles.communityStatTitle}>Your Rank</Text>
              <Text style={styles.communityStatValue}>#127</Text>
            </View>
          </View>
          <Text style={styles.communitySubtext}>
            You're in the top 25% of preparedness champions in your area!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// --- Reusable Components ---
const StatBox = ({ title, value, icon }) => (
  <View style={styles.statBox}>
    <Ionicons name={icon} size={24} color="#FF5E3A" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const QuickAction = ({ title, subtitle, icon, onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.quickAction, disabled && styles.disabledAction]}
    onPress={onPress}
    disabled={disabled}
  >
    <Ionicons name={icon} size={28} color={disabled ? "#888" : "#FF5E3A"} />
    <Text style={[styles.quickActionTitle, disabled && styles.disabledText]}>{title}</Text>
    <Text style={[styles.quickActionSubtitle, disabled && styles.disabledText]}>{subtitle}</Text>
  </TouchableOpacity>
);

const AlertCard = ({ title, description, location, severity }) => {
  const severityColors = { high: "#FF3A3A", medium: "#FFA53A", low: "#3A9BFF" };
  return (
    <View style={styles.alertCard}>
      <View
        style={[styles.alertSeverity, { backgroundColor: severityColors[severity] || "#FFA53A" }]}
      />
      <View style={styles.alertContent}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertDescription}>{description}</Text>
        <Text style={styles.alertLocation}>{location}</Text>
      </View>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  header: { marginBottom: 25 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  welcome: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 5 },
  subText: { color: "#a3a3a3", fontSize: 16 },
  logoutButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#FF5E3A", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  logoutText: { color: "#fff", fontWeight: "600", marginLeft: 6 },
  statsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  statBox: { width: "48%", backgroundColor: "#1E2761", borderRadius: 12, padding: 15, marginBottom: 15, alignItems: "center" },
  statValue: { color: "#fff", fontSize: 28, fontWeight: "700", marginVertical: 5 },
  statTitle: { color: "#ddd", fontSize: 14, textAlign: "center" },
  progressCard: { backgroundColor: "#1E2761", borderRadius: 16, padding: 20, marginBottom: 20 },
  cardTitle: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 10 },
  xpText: { color: "#FF5E3A", fontSize: 32, fontWeight: "800", marginBottom: 15 },
  progressContainer: { marginTop: 10 },
  progressLabel: { color: "#ddd", fontSize: 14, marginBottom: 5 },
  progressBarBackground: { height: 10, backgroundColor: "#0A0F3D", borderRadius: 5, overflow: "hidden", marginBottom: 5 },
  progressBarFill: { height: "100%", backgroundColor: "#FF5E3A", borderRadius: 5 },
  progressTextContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  progressText: { color: "#fff", fontSize: 14 },
  nextLevelText: { color: "#a3a3a3", fontSize: 12 },
  modeContainer: { marginBottom: 15 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 10 },
  quickActionsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  quickAction: { width: "48%", backgroundColor: "#1E2761", borderRadius: 12, padding: 15, marginBottom: 15 },
  quickActionTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginTop: 5 },
  quickActionSubtitle: { color: "#a3a3a3", fontSize: 12 },
  disabledAction: { backgroundColor: "#0A0F3D" },
  disabledText: { color: "#888" },
  rainfallCard: { backgroundColor: "#1E2761", borderRadius: 12, padding: 15, marginBottom: 20 },
  alertCard: { flexDirection: "row", backgroundColor: "#1E2761", borderRadius: 12, padding: 12, marginBottom: 12 },
  alertSeverity: { width: 8, borderRadius: 4 },
  alertContent: { marginLeft: 10, flex: 1 },
  alertTitle: { color: "#FF5E3A", fontWeight: "700", fontSize: 14 },
  alertDescription: { color: "#fff", fontSize: 12 },
  alertLocation: { color: "#a3a3a3", fontSize: 12, marginTop: 2 },
  communityCard: { backgroundColor: "#1E2761", borderRadius: 16, padding: 20, marginBottom: 30 },
  communityStats: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  communityStatTitle: { color: "#a3a3a3", fontSize: 12 },
  communityStatValue: { color: "#FF5E3A", fontSize: 18, fontWeight: "700" },
  communitySubtext: { color: "#ddd", fontSize: 12 },
  autoLiveBanner: { backgroundColor: "#FF3A3A", paddingVertical: 6, alignItems: "center" },
  autoLiveText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});