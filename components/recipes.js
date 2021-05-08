import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchBallLoading } from 'react-loadingg';
import RecipeCard from './recipe-card'
import axios from 'axios'
import {SPOON_API_KEY} from '@env'

function Recipes(props) {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchRecipes(ls, num=5) {
      const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
          apiKey: SPOON_API_KEY,
          ingredients: ls.join(","),
          number: num,
          ranking: 2
        }
      });
      // let response = {data: ["apple", "sugar"]}
      // console.log(response);
      setRecipes(response.data);
      setLoading(false);
    };
    fetchRecipes(props.ingredients);
  }, []);

  if (loading) {
    return <TouchBallLoading color="#FFFF00"/>;
  } else {
    let results = [];
    for (let i = 0; i < recipes.length; i++) {
      results.push(<RecipeCard recipe={recipes[i]} key={i}></RecipeCard>);
    }
    return (
      <ScrollView>
        {results}
      </ScrollView>
    );
  }
}

export default Recipes;