import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleApi } from './components/googleApi';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GoogleApi"
          component={ GoogleApi }

        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
