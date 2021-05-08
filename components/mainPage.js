import React, { useEffect, useState } from 'react';
import { Alert, Text, View, FlatList, Button } from 'react-native';

function MainPage(props) {
  return(
    <View>
      <Text>
        Joe's Kitchen
      </Text>
      <Button
        title="Start"
        onPress={ () => props.navigation.navigate('CameraPage') } 
      />
    </View>
  );
}

export { MainPage };