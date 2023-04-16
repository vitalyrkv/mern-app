import { useState, useEffect  } from "react"
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID"
import { useCookies } from 'react-cookie'

export const Home = () => {
    const [recipes, setRecipes] = useState([])
    const [savedRecipes, setSavedRecipes] = useState([])
    const userID = useGetUserID()
    const [cookies,_] = useCookies(['access_token'])

    //used whenever component is rendered
    useEffect(() => {
        const fetchRecipe = async () => {
            try{
                const response = await axios.get('http://localhost:3001/recipes')
                setRecipes(response.data)
            }catch(error){
                console.error(error)
            }
        }
        const fetchSavedRecipes = async () => {
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`)
                console.log(response.data)
                setSavedRecipes(response.data.savedRecipes)
            }catch(error){
                console.error(error)
            }
        }
        fetchRecipe()
        if(cookies.access_token) fetchSavedRecipes()
    }, [])

    const saveRecipe = async(recipeID) => {
        try{
            const response = await axios.put('http://localhost:3001/recipes', {recipeID, userID}, {headers: {authorization: cookies.access_token} })
            setSavedRecipes(response.data.savedRecipes)
        }catch(error){
            console.error(error)
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id)


    return(
        <div>
        <h1>Recipes</h1>
        <ul>
            {recipes.map((recipe) => (
                <li key = {recipe._id}>
                    <div>
                        {savedRecipes.includes(recipe._id) && <h3>Saved in my recipes</h3>}
                        <h2>{recipe.name}</h2>
                        <button onClick = {() => saveRecipe(recipe._id)} disabled = {isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}</button>
                    </div>
                    <div className = 'instructions'>
                        <p>{recipe.instructions}</p>
                    </div>
                    <img src = {recipe.imageUrl} alt = {recipe.name}></img>
                    <p>Cooking time: {recipe.cookingTime}</p>
                </li>
            ))}
        </ul>
        </div>
    )
}