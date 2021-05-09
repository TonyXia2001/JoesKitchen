import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Review } from './components/review';
import { MainPage } from './components/mainPage';
import { CameraPage } from './components/cameraPage'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainPage"
          component={ MainPage }
        />
        <Stack.Screen
          name="CameraPage"
          component={ CameraPage }
          // options={{
          //   headerRight: () => (
          //     <TouchableOpacity
          //       onPress={() => alert('This is a button!')}
          //     >
          //       <Text>&gt;</Text>
          //     </TouchableOpacity>
          //   ),
          // }}
        />
        <Stack.Screen
          name="Review"
          component={ Review }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
