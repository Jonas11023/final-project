// AlertCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AlertCard = ({ title, description, location, severity }) => {
  const severityColors = {
    high: '#FF3A3A',
    medium: '#FFA53A',
    low: '#3A9BFF'
  };
  
  return (
    <View style={styles.alertCard}>
      <View style={[styles.alertSeverity, {backgroundColor: severityColors[severity]}]} />
      <View style={styles.alertContent}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertDescription}>{description}</Text>
        <Text style={styles.alertLocation}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertCard: {
    backgroundColor: '#1E2761',
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  alertSeverity: {
    width: 8,
  },
  alertContent: {
    flex: 1,
    padding: 15,
  },
  alertTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  alertDescription: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 5,
  },
  alertLocation: {
    color: '#a3a3a3',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default AlertCard;