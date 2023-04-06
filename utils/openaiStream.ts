export type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
    role: ChatGPTAgent
    content: string
  }
export type Recipe = {
    name: string,
    description: string
  }
export interface OpenAIStreamPayload {
    model: string
    messages: ChatGPTMessage[]
    temperature?: number
    top_p?: number
    frequency_penalty?: number
    presence_penalty?: number
    max_tokens?: number
    stream?: boolean
    stop?: string[]
    user?: string
    n?: number
  }
  

  export const fetchAnswer = async (e: any, systemMessage: string, prompt: string): Promise<string> => {
    
    e.preventDefault();

    const message: ChatGPTMessage[] =  [
      {
          role: "system",
          content: systemMessage
      },
      {
        role: "user",
        content: prompt
      }
  ];

  const completePrompt: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: message
  }

    try {
      console.log(message)
      const response = await fetch(`/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(completePrompt)
      });

      if (!response.ok) {
        throw new Error("Response not OK");
      }

      const data = await response.json()
  
      const content = data.response.message.content
      return content

    } catch (error: any) {
      console.log(error.message)
      return "";
  }
  }
