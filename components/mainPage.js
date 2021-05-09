import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
// import styled from 'styled-components';
import { Button } from 'react-native-elements';
// import styles from './styles';


function MainPage(props) { 
  return(
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image style={styles.bakcgroundImage} source={require('../assets/home.jpg')} />
      </View>
      <Text style={styles.title}>Joe's {"\n"}Kitchen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("CameraPage")}
      >
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "30%", 
    marginBottom: "20%", 
    marginLeft: "7%", 
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    border: "1px silver solid",
    textAlign: "center",
    fontSize: 30,
    borderRadius: "5%"
  },
  title:{
    color: "black",
    marginLeft: "7%",
    marginTop: "20%",
    fontSize: 50,
    zIndex: 1
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
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