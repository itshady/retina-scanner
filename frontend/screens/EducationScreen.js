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
      title: 'Health Canada',
      content: 'Content for Accordion Item 1',
      link: 'https://reactnativeelements.com/docs/components/listitem_accordion',
    },
    {
      title: 'Health America',
      content: 'Content for Accordion Item 2',
      link: 'https://www.w3schools.com/react/default.asp',
    },
    {
      title: 'Health Mexico',
      content: 'Content for Accordion Item 3',
      link: 'https://www.nytimes.com/games/connections',
    },
    {
      title: 'Diabetic Retinopathy',
      content: 'Diabetic retinopathy is a diabetes complication that affects eyes. It\'s caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina). Learn more about diabetic retinopathy and its symptoms, prevention, and treatment.',
      link: 'https://www.mayoclinic.org/diseases-conditions/diabetic-retinopathy/symptoms-causes/syc-20371611',
    },
    {
      title: 'Machine Learning',
      content: 'Machine learning is an application of artificial intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. Explore resources to understand machine learning concepts, algorithms, and applications.',
      link: 'https://en.wikipedia.org/wiki/Machine_learning',
    },
    {
      title: 'Fundoscopy',
      content: 'Fundoscopy is a medical examination of the back of the eye (retina) and its blood vessels using a special instrument called an ophthalmoscope. It helps in diagnosing various eye conditions and systemic diseases. Learn more about fundoscopy procedure and its significance.',
      link: 'https://www.aao.org/eye-health/diseases/what-is-fundoscopy',
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
        It is important to stay informed about your medical information. This will allow you to be physically and mentally capable of tackling the day 😊. Please use the below resources to get useful knowledge on your medical data this app provides or dive into your curiosity! Each section is click-enabled, so just click the overall information section if you'd like to learn more about that topic.
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
