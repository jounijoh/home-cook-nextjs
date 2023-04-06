import { ButtonWithOptions } from "./buttonComp"
import { Recipe } from "@/utils/openaiStream";

interface FindRecipesProps {
    handleOptionSelect: (option: string) => void;
    getRecipes: (e: React.MouseEvent<HTMLButtonElement>) => void;
    loading: boolean;
    recipes: Recipe[];
}

export const FindRecipes: React.FC<FindRecipesProps> = ({
    handleOptionSelect,
    getRecipes,
    loading,
    recipes
}) => {

    return (
        <>
            <label>Find recipes</label>

            <ButtonWithOptions onSelect={handleOptionSelect} />

            <button onClick={getRecipes} >GET RECIPES</button>
            <div>{loading ? "fetching data" : ""}</div>
            <div>{recipes.map((recipe, index) => (
                <div key={index}>
                    {`${index + 1}. ${recipe.name} - ${recipe.description}`}
                </div>
            ))}</div>
        </>
    )
} 