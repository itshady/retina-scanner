import React, { useState } from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import { StyleSheet, View, TextInput, Text, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';

export default function LandingScreen({navigation}) {
  const backendEndpoint = process.env.EXPO_PUBLIC_BACKEND_IP;

  const [response, setResponse] = useState('');
  const [number, setNumber] = useState('');

  const pingServer = async () => {
    try {
      const res = await axios.get(`http://${backendEndpoint}/ping/${number}`,);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse('Error pinging server');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
