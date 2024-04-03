import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Image, TouchableWithoutFeedback  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { ResultsPopup, diseaseSeverities } from '../components/ResultsPopup';
import { fetchResults, insertResult } from '../components/database';


// https://docs.expo.dev/versions/latest/sdk/camera/

export default function ScanningScreen({results, setResults, navigation}) {
  const backendEndpoint = process.env.EXPO_PUBLIC_BACKEND_IP;

  const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions();
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);

  const updateResults = (newResult) => {
    setResult(newResult);
    insertResult(diseaseSeverities[newResult]);
    fetchResults(setResults);
    setShowResults(true);
  };

  // this function is in shambles
  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.getCameraPermissionsAsync();
    
    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    // console.log("image: " + imagePermission.status);
    // console.log("camera: " + cameraPermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== 'granted'
      // cameraPermission.status !== 'granted'
    ) {
      // alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const sendImageToBackend = async (uri) => { //uri comes in
    // Convert the image to Base64
    // console.log("here " + uri)
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    const base64Image = `data:image/jpeg;base64,${base64}`;

    console.log("sending image to backend...")

    const startTime = Date.now();

    axios.post(`http://${backendEndpoint}/upload`, {
      image: base64Image,
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Prevents caching
        'Pragma': 'no-cache', // HTTP 1.0.
        'Expires': '0' // Proxies.
      }
    })
    .then((response) => {
      const duration = Date.now() - startTime;
      console.log(`Image uploaded successfully in ${duration} ms:`, response.data);
      updateResults(response.data["message"])
    })
    .catch((error) => {
      const duration = Date.now() - startTime;
      console.error(`Error uploading image after ${duration} ms:`, error);
    });
  };

  const takePicture = async () => {
    if (camera) {
      // Make sure to wait for the onCameraReady callback before calling this method.
      camera.takePictureAsync({ onPictureSaved: onPictureSaved });      
    }
  };

  const onPictureSaved = (photo) => {
    setImageUri(photo.uri);
    sendImageToBackend(photo.uri)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      // base64: true,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
      sendImageToBackend(result.assets[0].uri)
    }
  };

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>

      <Button title={'Flip'} onPress={toggleCameraType} />
      <Button title={'Take Picture'} onPress={takePicture} />
      <Button title={'Gallery'} onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
      {showResults && <ResultsPopup onClose={() => setShowResults(false)} result={result} />}
    </View>
  );
}

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