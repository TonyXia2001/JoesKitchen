import React, { useEffect, useState } from 'react';
import { Alert, Text, View, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

function MainPage(props) {
  return(
    <View>
      <Text>
        Joe's Kitchen
      </Text>
      <StyledTouchableOpacity
        onPress={ () => props.navigation.navigate('CameraPage') } 
      >
        <Text style={{
          fontSize: 16,
          color: '#fff',
        }}>
          Get Started
        </Text>
      </StyledTouchableOpacity>
    </View>
  );
}

const StyledTouchableOpacity = styled.TouchableOpacity`
  marginTop: 50px;
  justifyContent: center;
  alignItems: center;
  width: 200px;
  height: 50px;
  borderRadius: 25px;
  backgroundColor: turquoise;
`;

export { MainPage };