import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
// import styles from './styles';


function MainPage(props) { 
  return(
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image style={styles.backgroundImage} source={require('../assets/home.jpg')} />
      </View>
      <Text style={styles.title}>Joe's {"\n"}Kitchen</Text>
      <StyledButton
        onPress={() => props.navigation.navigate("CameraPage")}
      >
        <Text style={styles.start}>Start</Text>
      </StyledButton>
    </View>
  );
}

const StyledButton = styled(TouchableOpacity)`
  width: 30%; 
  marginBottom: 20%; 
  marginLeft: 7%; 
  paddingTop: 10px;
  paddingBottom: 10px;
  paddingLeft: 20px;
  paddingRight: 20px;
  borderWidth: 1px;
  borderColor: silver;
  textAlign: center;
  fontSize: 30px;
  borderRadius: 5px;
`;

const styles = StyleSheet.create({
  start: {
    textAlign: "center"
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
  backgroundImage: {
      flex: 1, 
      width: null, 
      height: null,
      opacity: 0.3,
      zIndex: -1
  }
});

export { MainPage };