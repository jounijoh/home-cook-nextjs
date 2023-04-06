import { ChatGPTMessage, Recipe, fetchAnswer } from "@/utils/openaiStream";
import { marked } from "marked";
import parse from "html-react-parser"
import { useState } from "react";

interface FindInstructionsProps {
    instructions: string
    //getNutriInfo: (e: any) => Promise<void>;
}

export const FindNutriInfo: React.FC<FindInstructionsProps> = ({
    //getNutriInfo
    instructions,
}
) => {

    const [nutriInfo, setNutriInfo] = useState('')
    const [loading, setLoading] = useState(false)

    /*const message: ChatGPTMessage[] =  [      {
        role: "system",
        content: "You are nutrional therepist. Give short list of macros and info about the nutrional values of the recipe."
    },
    ...body
];*/

    const getNutriInfo = async (e: any) => {

        const systemPrompt = "You are nutrional therepist. Give short list of macros and info about the nutrional values of the recipe."

        try {
            setLoading(true)
            if (!instructions) {
                console.log("No Recipe Selected for Shopping list");
                return
            }

            const prompt = instructions
            console.log(instructions)
            const content = await fetchAnswer(e, systemPrompt, prompt, 'nutritions')

            if (!content) {
                console.log("Error while fetching shopping list")
                return
            }

            console.log(content)
            setNutriInfo(content)

        } catch (error: any) {

            console.log(error.message)

        } finally {

            setLoading(false)
        }
    }
    return (
        <>  {instructions ? 
            <>
            <button onClick={getNutriInfo}>GET NUTRITIONAL INFO</button>
            <div>{loading ? "fetching nutritional information" : ""}</div>
            <div>{nutriInfo ? parse(marked(nutriInfo)) : ""}</div>
            </>
        : ""}
        </>
    )
}