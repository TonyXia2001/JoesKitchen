import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import styled from 'styled-components';
import Dialog from "react-native-dialog";

function Review({navigation, route}) {
  const [foodItems, setFoodItems] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    console.log(foodItems)
    console.log(route.params.foodList)
    setFoodItems([...new Set(route.params.foodList)]);
  }, []);

  const deleteFoodItem = (foodName) => {
    setFoodItems(foodItems.filter(each => each !== foodName));
  }

  const createFoodItem = (foodName) => {
    if (foodName === "" || foodName === null || foodName === undefined) {
      return;
    }
    if (foodItems.findIndex(food => food === foodName ) === -1) {
      setFoodItems([...foodItems, foodName]);
    } else {
      alert("You already added this food!");
    }
  }

  return (
    <React.Fragment>
      <StyledNext
          onPress={ () => {
              navigation.navigate('Recipes', {ingredients: foodItems});
      }}>
          <Text>Next</Text>
      </StyledNext>
      <FoodInputDialog 
        visible={ dialogVisible }
        setVisible={ setDialogVisible }
        createFood={ createFoodItem }
      />
      <StyledAdd
        onPress={ () => {
          setDialogVisible(true);
        }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>+</Text>
      </StyledAdd>
      <StyledView>
        <SafeAreaView> 
          {
          foodItems.map((item, index) => (
            <FoodItem
              key={ item }
              name={ item }
              deleteFunction={ deleteFoodItem.bind(this, item) }
            />
          ))
          }
        </SafeAreaView>
      </StyledView>
    </React.Fragment>
  );
}

function FoodInputDialog(props) {
  const [foodInput, setFoodInput] = useState("");

  return (
    <View>
      <Dialog.Container visible={ props.visible }>
        <Dialog.Title>Add a new food item</Dialog.Title>
        <Dialog.Input label="Food Item"
          value={ foodInput } onChangeText={ setFoodInput }
        >
        </Dialog.Input>
        <Dialog.Button label="Cancel"
          onPress={ () => {
            props.setVisible(false);
            setFoodInput("");
          }}
        />
        <Dialog.Button label="Add"
          onPress={ () => {
            props.createFood(foodInput);
            setFoodInput("");
            props.setVisible(false);
          }}
        />
      </Dialog.Container>
    </View>
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

const StyledAdd = styled(TouchableOpacity)`
  position: absolute;
  zIndex: 3;
  top: 30px;
  right: 15px;
  padding: 5px 13px;
  background: #8912FF;
  borderRadius: 50px;
  shadowColor: black;
  shadowOpacity: 0.3;
  shadowRadius: 3px;
  shadowOffset: 2px 2px;
  elevation: 15;
`;

const StyledView = styled(ScrollView)`
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
  width: 40%;
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
