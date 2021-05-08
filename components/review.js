import React, { useEffect, useState } from 'react';
import { Alert, Text, View, FlatList, Button } from 'react-native';
import styled from 'styled-components/native';

function Review(props) {
  const [foodItems, setFoodItems] = useState(["Broccoli", "Bell pepper", "Mushroom", "Scallions"]);

  useEffect(() => {
    console.log(foodItems)
  }, []);

  const deleteFoodItem = (foodName) => {
    setFoodItems(foodItems.filter(each => each !== foodName));
  }

  return (
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
  fontSize: 24px;
  paddingVertical: 10px;
  padding: 5px;
  marginRight: 5px;
  textAlign: center;
`;

export { Review };
