import React, {useState, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
// import { TouchBallLoading } from 'react-loadingg';
import RecipeCard from './recipe-card'
import axios from 'axios'
import {SPOON_API_KEY} from '@env'
import styled from 'styled-components';

function Recipes({navigation, route}) {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(SPOON_API_KEY);
    async function fetchRecipes(ls, num=5) {
      const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
          apiKey: SPOON_API_KEY,
          ingredients: ls.join(","),
          number: num,
          ranking: 1,
          limitLicense: false,
        }
      }).catch(e => {
        console.log(Error(e));
        alert("Could not fetch recipes from API.")
      });
      // let response = {data: ["apple", "sugar"]}
      // console.log(response);
      setRecipes(response.data);
      setLoading(false);
    };
    fetchRecipes(route.params.ingredients);
  }, []);

  if (loading) {
    return (
      <View>
      </View>
    );
  } else {
    let results = [];
    for (let i = 0; i < recipes.length; i++) {
      results.push(<RecipeCard recipe={recipes[i]} key={i}></RecipeCard>);
    }
    return (
      <React.Fragment>
        <StyledNext
          onPress={ () => {
          navigation.navigate('Home');
        }}>
          <Text>Home</Text>
        </StyledNext>
        <ScrollView>
        {results}
      </ScrollView>
      </React.Fragment>
    );
  }
}

const StyledNext = styled(TouchableOpacity)`
    top: -36px;
    left: 360px;
    background: #fff;
    z-index: 3;
    position: absolute;
    width: 50px;
`;

export default Recipes;