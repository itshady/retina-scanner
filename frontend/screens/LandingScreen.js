import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import axios from 'axios';

export default function LandingScreen({navigation}) {
    const [response, setResponse] = useState('');
    const [number, setNumber] = useState('');
  
    const pingServer = async () => {
      try {
        const res = await axios.get(`http://100.69.247.33/ping/${number}`,);
        setResponse(res.data);
      } catch (error) {
        console.error(error);
        setResponse('Error pinging server');
      }
    };
  
    return (
  
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setNumber}
          value={number}
          placeholder="Enter a number"
          keyboardType="numeric"
        />
        <Button title="Ping Server" onPress={pingServer} />
        <Text>{response}</Text>
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
  