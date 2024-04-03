import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiagnosisProgression = ({ results }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnosis Progression Over Time</Text>
      {results.map((item, index) => (
        <View key={index} style={styles.diagnosisItem}>
          <Text style={styles.diagnosisText}>{item.result}</Text>
          <Text style={styles.dateText}>{item.resultDate}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  diagnosisItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  diagnosisText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
});

export default DiagnosisProgression;
