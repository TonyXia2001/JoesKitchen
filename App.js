import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleApi } from './components/googleApi';
import { CameraPage } from './components/cameraPage.js'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CameraPage"
          component={ CameraPage }
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
