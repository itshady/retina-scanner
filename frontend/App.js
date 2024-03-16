import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [response, setResponse] = useState('');

  const pingServer = async () => {
    try {
      let response = await fetch('http://100.69.247.33/ping');
      let responseText = await response.text();
      setResponse(responseText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
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
});
