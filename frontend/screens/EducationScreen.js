import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Dimensions } from 'react-native';

export default function EducationScreen({ navigation }) {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  const accordionData = [
    {
      title: 'Diabetic Retinopathy',
      content: 'Diabetic retinopathy is a diabetes complication that affects eyes. It\'s caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina). There are different ways of classifying the degree of seriousness of diabetic retionpathy, nonproliferative and proliferative. Which means that it is an advanced stage, where new blood vessels grow on the surface that can be seen in the fundoscopic image. Non-proliferative can be separated into: no retinopathy, very mild, mild, moderate, and severe. Learn more about diabetic retinopathy and its symptoms, prevention, and treatment by clicking this section',
      link: 'https://www.ncbi.nlm.nih.gov/books/NBK560805/#:~:text=No%20retinopathy%3A%20No%20retinal%20lesions,grades%20mild%20and%20severe%20NPDR)',
    },
    {
      title: 'Machine Learning',
      content: 'Machine learning is an application of artificial intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. This app uses machine learning to look at the pictures of your eye and perform a diagnosis. We have trained the ML model based on previously-taken pictures that have a known diagnosis (which was done through typical measures, like a doctor\'s visit). Explore resources to understand machine learning concepts, algorithms, and applications by clicking this section.',
      link: 'https://en.wikipedia.org/wiki/Machine_learning',
    },
    {
      title: 'Fundoscopy',
      content: 'Fundoscopy is a medical examination of the back of the eye (retina) and its blood vessels using a special instrument called an ophthalmoscope (or fundoscope). It helps in diagnosing various eye conditions and systemic diseases. For this app, you use a light-emitting device called an LED and your phone camera to take a picture of the back of your eye. The LED must be close to the camera in order to direct light from the LED to the back of the eye and directly back to the camera. Your camera flash is too far from the camera to direct light to your retina and reflect it directly back to the camera.  Learn more about fundoscopy procedure and its significance by clicking this section.  ',
      link: 'https://www.aao.org/eye-health/diseases/what-is-fundoscopy',
    },
    {
      title: 'Dealing With Your Data - Specificity and Sensitivity of the Model',
      content: 'Sensitivity and specificity are crucial metrics used to evaluate the performance of a diagnostic test. Sensitivity measures the ability of a test to correctly identify individuals who have the disease or condition, while specificity measures the ability of a test to correctly identify individuals who do not have the disease or condition. To learn more about sensitivity and specificity in diagnostic testing, you can refer to this link:',
      link: 'https://www.ncbi.nlm.nih.gov/books/NBK557491/#:~:text=Sensitivity%20and%20specificity%20are%20inversely,a%20finding%20having%20no%20disease. ',
    },
    
    // Add more items as needed
  ];

  function handlePress(url) {
    Linking.openURL(url);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Education Section</Text>
      <Text style={styles.subtitle}>
        It is important to stay informed about your medical information. This will allow you to be physically and mentally capable of tackling the day 😊. Please use the below resources to get useful knowledge on your medical data this app provides or dive into your curiosity! Each section is click-enabled, so just click the overall information section if you'd like to learn more about that topic. These resources are important for you to be well-acquainted with so that you can better underastand that this app does not give a 100% accurate diagnosis. The accuracy that we currently have is about 75%.
      </Text>
      {accordionData.map((item, index) => (
        <TouchableOpacity onPress={() => handlePress(item.link)} key={index} style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemContent}>{item.content}</Text>
          {/* <Text style={styles.itemLink}>{item.link}</Text> */}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  itemLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
