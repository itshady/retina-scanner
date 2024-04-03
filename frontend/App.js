import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LandingScreen from './screens/LandingScreen';
import ScanningScreen from './screens/ScanningScreen';
import HistoryScreen from './screens/HistoryScreen';
import EducationScreen from './screens/EducationScreen';
import { initializeDatabase } from './components/database';


const Tab = createBottomTabNavigator();
initializeDatabase();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions= {({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Profile':
                iconName = focused ? 'camera' : 'camera-outline';
                break;
              case 'History':
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                break;
              case 'Education':
                iconName = focused ? 'book' : 'book-outline';
                break;
              default:
                iconName = focused ? 'camera' : 'camera-outline';
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        >
        <Tab.Screen
          name="Home"
          component={LandingScreen}
          options={{title: 'Welcome'}}
        />
        <Tab.Screen 
          name="Profile" 
          component={ScanningScreen} 
          options={{title: 'Scanning'}}
        />
        <Tab.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{title: 'History and Results'}}
        />
        <Tab.Screen 
          name="Education" 
          component={EducationScreen} 
          options={{title: 'Learn More!'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}