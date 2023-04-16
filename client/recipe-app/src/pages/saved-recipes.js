import { useState, useEffect  } from "react"
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID"

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([])
    const userID = useGetUserID()

    //used whenever component is rendered
    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
                console.log(response.data)
                setSavedRecipes(response.data.savedRecipes)
            }catch(error){
                console.error(error)
            }
        }
        fetchSavedRecipes()
    }, [])

    return(
        <div>
        <h1>Saved Recipes</h1>
        <ul>
            {savedRecipes.map((recipe) => (
                <li key = {recipe._id}>
                    <div>
                        {savedRecipes.includes(recipe._id) && <h3>Saved in my recipes</h3>}
                        <h2>{recipe.name}</h2>
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