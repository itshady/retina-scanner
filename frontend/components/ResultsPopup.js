import React from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const diseaseSeverities = {
  "nodr": "No diabetic retinopathy",
  "mild_npdr": "Mild non-proliferative diabetic retinopathy",
  "moderate_npdr": "Moderate non-proliferative diabetic retinopathy",
  "severe_npdr": "Severe non-proliferative diabetic retinopathy",
  "pdr": "Proliferative diabetic retinopathy"
}

// Popup to display the results from the ML model.
const ResultsPopup = ({ onClose, result }) => {
  const navigation = useNavigation();

  const navigateToEducationPage = () => {
    navigation.navigate('Education'); 
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.resultsOverlay}>
        <View style={styles.resultsContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text>Your eye has been scanned! {'\n'}You exhibit traits of: {'\n'}{diseaseSeverities[result]}</Text>
          <TouchableOpacity onPress={navigateToEducationPage} style={styles.link}>
            <Text style={{textDecorationLine: 'underline'}}>Learn more here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  resultsContainer: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  resultsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  link: {
    paddingTop: 20,
    alignItems: 'center',
    width: '100%'
  },
});

export { diseaseSeverities, ResultsPopup };