import Axios from 'axios'
import {API_KEY} from '@env'

async function fetchRecipes(ls, num=5) {
  const response = await Axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
    params: {
      apiKey: API_KEY,
      ingredients: ls.join(","),
      number: num
    }
  })
  return response
}

export default fetchRecipes
