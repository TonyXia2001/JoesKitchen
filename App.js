import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Review } from './components/review';
import { MainPage } from './components/mainPage';
import { CameraPage } from './components/cameraPage';
// import Recipes from './components/recipes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ MainPage }
          options={{title: "Joe's Kitchen", headerShown: false}}
        />
        <Stack.Screen
          name="CameraPage"
          component={ CameraPage }
        />
        <Stack.Screen
          name="Review"
          component={ Review }
        />
        {/* <Stack.Screen
          name="Recipes"
          component={ Recipes }
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
