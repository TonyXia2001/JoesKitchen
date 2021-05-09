import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, View, Image, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';
import { Button } from 'react-native-elements';
// import styles from './styles';


function MainPage(props) {
  return(
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image style={styles.bakcgroundImage} source={require('../assets/home.jpg')} />
      </View>
      <Text style={styles.title}>Joe's <br/>Kitchen</Text>
      <Button 
        title="Get Started"
        type="outline"
        onPress={ () => props.navigation.navigate("CameraPage") }
        containerStyle={{width: "30%", marginBottom: "20%", marginLeft: "7%"}}
        // titleStyle={{color: "black"}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    color: "black",
    marginLeft: "7%",
    marginTop: "20%",
    fontSize: "30pt",
    zIndex: 1
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'left',
      justifyContent: 'space-between',
  },
  backgroundContainer: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
  }, 
  bakcgroundImage: {
      flex: 1, 
      width: null, 
      height: null,
      opacity: 0.3,
      zIndex: -1
  }
});

export { MainPage };