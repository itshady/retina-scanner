import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { fetchResults, insertResult } from '../components/database';
import DiagnosisProgression from '../components/Progression';

// 040500
export default function HistoryScreen({results, setResults, navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  // const [results, setResults] = useState([]);
  const [currentResult, setCurrentResult] = useState(undefined);

  useEffect(() => {
    // fetchResults(setResults);
    setIsLoading(false);

    console.log("results fetched")
  }, []);

  const addResult = () => {
    insertResult(currentResult);
    fetchResults(setResults)
    setCurrentResult(undefined);
  };
  
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading history...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <TextInput style={styles.input} value={currentResult} placeholder='Message...' onChangeText={setCurrentResult}/>
          <Button title="Add Self Log" onPress={addResult}></Button>
          <DiagnosisProgression results={results}></DiagnosisProgression>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5, // Rounded corners
    borderColor: '#007BFF', // Border color
    backgroundColor: '#FFFFFF', // Background color
    color: '#000000', // Text color
    fontSize: 16, // Text size
  },  
});
