import React, { useCallback, useEffect, useState} from 'react';
import { Linking, Alert } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import axios from 'axios'
import {SPOON_API_KEY} from '@env'

export default function RecipeCard(props) {
  const [link, setLink] = useState("https://www.google.com")
  const retrieveLink = async (props) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${props.recipe.id}/information`, {
      params: {
        apiKey: SPOON_API_KEY,
        includeNutrition: false
      }
    });
    setLink(response.data.sourceUrl);
    console.log(response.data.sourceUrl);
  }

  useEffect(() => {
    retrieveLink(props);
    console.log(props.recipe.image);
  }, [])

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert(`Don't know how to open this URL: ${link}`);
    }
  }, [link]);

  return (
    <Card>
      <Card.Title>{props.recipe.title}</Card.Title>
      <Card.Divider/> 
      <Card.Image source={{uri: props.recipe.image}}>
      </Card.Image>
      <Button
        icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='More Info' 
        onPress={handlePress}/>
    </Card>
  )
}

 