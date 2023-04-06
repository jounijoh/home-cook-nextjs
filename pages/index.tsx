"use client";
import { useState } from "react";
import { FindRecipes } from "@/components/FindRecipes";
import { FindInstructions } from "@/components/FindInstructions";
import { CreateShoppigList } from "@/components/CreateShoppingList";
import { FindNutriInfo } from "@/components/findNutriInfo";
import { Recipe } from "@/utils/openaiStream";
import { fetchAnswer } from "@/utils/openaiStream";



export default function Home() {

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [instructions, setInstructions] = useState("")

  // GET ANSWER FROM API AND MAP IT TO AN OBJECT
  const getRecipes = async (e: any) => {
    
    const systemPrompt = "You are homecook. Give List of 5 recipes as a list with Recipe name and single sentence description. "

    const content = await fetchAnswer(e, systemPrompt, selectedOption)

    try {

      setLoading(true)

      if (!content) {
        console.log("Error while fetching recipes")
        return
      }
      const listOfRecipes: string[] = content.split(/\s*\d+\.\s*/).slice(1)
  
      const recipeObjects = listOfRecipes.map(item => {
        const [name, ...descriptionParts] = item.split(' - ');
        const description = descriptionParts.join(' - ');
        return { name, description };
      });
      
      setRecipes(recipeObjects)
      setSelectedRecipe(recipeObjects[0]) // automaticly selected the first recipe

    } catch (error:any) {
      console.log(error.message)
    }finally{
      setLoading(false)
    }

    
  }

  // GET INSTRUCTIONS FOR SELECTED RECIPE
  const getInstructions = async (e: any) => {

    try {

      setLoading(true)

      if (!selectedRecipe) {
        console.log("No Recipe selected")
        return
      }

      const systemPrompt = "You are homecook. Give cooking instructions to the given recipe for four servings in metric units "
      const userPrompt = selectedRecipe.name + "" + selectedRecipe.description
    
      const content = await fetchAnswer(e, systemPrompt, userPrompt)

      if (!content) {
        console.log("Error while fetching instructions")
        return
      }

      setInstructions(content)

    } catch (error: any) {
      console.log(error.message)
    }finally{
      setLoading(false)
    }
  
  }


  const handleOptionSelect = (option: string) => {
    console.log(`Selected option: ${option}`);
    setSelectedOption(option)
  };

  const handleRecipeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value, 10);
    setSelectedRecipe(recipes[selectedIndex]);
  };


  return (
    <>
      <FindRecipes
        handleOptionSelect={handleOptionSelect}
        getRecipes={getRecipes}
        loading={loading}
        recipes={recipes}
      />
      <FindInstructions
        handleRecipeChange={handleRecipeChange}
        recipes={recipes}
        getInstructions={getInstructions}
        loading={loading}
        instructions={instructions}
      />
      <FindNutriInfo 
        instructions={instructions}
      />
      <CreateShoppigList
        loading={loading}
        instructions={instructions}
      />
    </>
  )
}
