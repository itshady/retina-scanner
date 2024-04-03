import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';
import DiagnosisProgression from '../components/Progression';

export default function HistoryScreen({navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [currentResult, setCurrentResult] = useState(undefined);

    const db = SQLite.openDatabase('results');

    useEffect(() => {
      fetchData = () => {
        db.transaction(tx => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY AUTOINCREMENT, result TEXT, resultDate DATETIME DEFAULT CURRENT_TIMESTAMP)')
        })
  
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM results', null,
            (txObj, resultSet) => {
              setResults(resultSet.rows._array)
              console.log(resultSet.rows._array);
            },
            (txObj, error) => console.log(error)
          );
        });
      }
      
      async function check() {
        await (fetchData());
      }

      check()

      setIsLoading(false);

      console.log("data mounted")
    }, [])

    async function addResult() {

      await db.transaction(async tx => {
        await tx.executeSql('INSERT INTO results (result) VALUES (?)', [currentResult],
        (txObj, resultSet) => {
          const currentDate = new Date();
          // Format the date as needed (e.g., MM/DD/YYYY)
          const formattedDate = currentDate.toLocaleDateString();
          let existingResults = [...results]
          existingResults.push({id: resultSet.insertId, result: currentResult, resultDate: formattedDate});
          setResults(existingResults)
          setCurrentResult(undefined);
        }),
        (txObj, error) => console.log(error);
      });
    }

    const ShowResults = () => {
      return (
        <View>
          {results.map((result, i) => {
            return (
              <View key={i}>
              <Text>{result.result} {result.resultDate}</Text>
              </View>
            )
          })}
        </View>
        
      )
    }
    
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
        <Text>History</Text>
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
  