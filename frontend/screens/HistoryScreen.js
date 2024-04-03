import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { initializeDatabase, fetchResults, insertResult } from '../components/database';
import DiagnosisProgression from '../components/Progression';

export default function HistoryScreen({navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [currentResult, setCurrentResult] = useState(undefined);

    useEffect(() => {
      initializeDatabase();
      fetchResults(setResults);
      setIsLoading(false);

      console.log("results fetched")
    }, []);

    const addResult = () => {
      console.log("before");
      insertResult(results, currentResult, setCurrentResult, setResults);
      console.log("after");
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
      <TextInput value={currentResult} placeholder='name' onChangeText={setCurrentResult}/>
        <Button title="Add Result" onPress={addResult}></Button>
        <DiagnosisProgression results={results}></DiagnosisProgression>
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
      width: '80%',
    },
  });
  