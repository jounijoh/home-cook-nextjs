import { marked } from "marked";
import parse from "html-react-parser"
import { useState } from "react";
import { fetchAnswer } from "@/utils/openaiStream";

interface CreateShoppigListProps {
    loading: boolean
    instructions: string
}

export const CreateShoppigList: React.FC<CreateShoppigListProps> = ({
    loading,
    
    instructions
}) => {

    const [shoppingList, setShoppingList] = useState('')

    const getShoppingList = async (e: any) => {

        const systemMessage = "Write me a shopping list for the given recipe. Write the list in a way that items are sorted according to which department they can be found in the store"

        if (!instructions) {
          console.log("No Recipe Selected for Shopping list");
          return
        }
        const prompt = instructions
        const content = await fetchAnswer(e, systemMessage, prompt)
    
        if (!content) {
          console.log("Error while fetching shopping list")
          return
        }
    
        setShoppingList(content);
      }



    return(
    <> {instructions ? (
        <>
            <button onClick={getShoppingList} >GET SHOPPING LIST</button>
            <div>{loading ? "fetching data" : ""}</div>
            <div>{shoppingList ? parse(marked(shoppingList)) : ""}</div>
        </>
    ) : (
        ""
    )}
    </>
    )
    }
