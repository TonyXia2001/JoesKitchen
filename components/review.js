import React, { useEffect, useState } from 'react';
import { Alert, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

function Review({props, route}) {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    console.log(foodItems)
    console.log(route.params.foodList)
    setFoodItems(route.params.foodList)
  }, []);

  const deleteFoodItem = (foodName) => {
    setFoodItems(foodItems.filter(each => each !== foodName));
  }

  return (
    <React.Fragment>
      <StyledNext
          onPress={ () => {
              this.props.navigation.navigate('Review', {ingredients: foodItems});
      }}>
          <Text>Next</Text>
      </StyledNext>
      <StyledView>
        <FlatList
          keyExtractor={ (item, index) => item}
          data={ foodItems }
          renderItem={ ({ item }) => (
            <FoodItem
              name={ item }
              deleteFunction={ deleteFoodItem.bind(this, item) }
            />
          )}
        />
      </StyledView>
    </React.Fragment>
  );
}

function FoodItem(props) {
  return (
    <View>
      <StyledContainer>
        <StyledBox>
          <StyledText>
            { props.name }
          </StyledText>
        </StyledBox>
        <StyledDeleteButton onPress={ () => props.deleteFunction(props.name) } title="Delete" />
      </StyledContainer>
    </View>
  );
}

const StyledNext = styled(TouchableOpacity)`
    top: -36px;
    left: 360px;
    background: #fff;
    z-index: 3;
    position: absolute;
    width: 50px;
`;

const StyledView = styled.View`
  flex: 1;
  marginLeft: 2.5%;
  marginRight: 2.5%;
  maxWidth: 95%;
`;

const StyledContainer = styled.View`
  display: flex;
  width: 90%;
  padding: 5px;
  paddingHorizontal: 10px;
  marginTop: 0;
  flexDirection: row;
  alignSelf: center;
  justifyContent: center;
`;

const StyledBox = styled.View`
  width: 50%;
`;

const StyledDeleteButton = styled.Button`
  margin: 5px;
`;

const StyledText = styled.Text`
  fontSize: 20px;
  paddingVertical: 10px;
  padding: 5px;
  marginRight: 5px;
  textAlign: center;
`;

export { Review };
