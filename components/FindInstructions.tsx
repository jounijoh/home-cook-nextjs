import { Recipe } from "@/utils/openaiStream";
import { marked } from "marked";
import parse from "html-react-parser"
import { ChatGPTMessage } from "@/utils/openaiStream";

interface FindInstructionsProps {
    handleRecipeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    recipes: Recipe[]
    getInstructions: (e: any) => Promise<void>
    loading: boolean
    instructions: string

}

export const FindInstructions: React.FC<FindInstructionsProps> = ({
    handleRecipeChange,
    recipes,
    getInstructions,
    loading,
    instructions
}) => (
    <>
    <div>{recipes.length > 0 ? (
        <>
            <form>
                <br></br>
                <label>Select one</label>
                <select id="mySelect" onChange={handleRecipeChange}>
                    {recipes.map((recipe, index) => (
                        <option key={index} value={index}>
                            {`${index + 1}. ${recipe.name}`}
                        </option>
                    ))}
                </select>
            </form>
            <button onClick={getInstructions} >GET INSTRUCTIONS</button>
        </>
    ) : (
        ""
    )}</div>
      <div>{loading && recipes.length > 0 ? "fetching data" : ""}</div>
      <div>{instructions ? parse(marked(instructions)) : ""}</div>
      </>
)
