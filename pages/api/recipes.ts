import { Configuration, OpenAIApi } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    
    const prompt = req.body;
  
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
    
    
    const response = await openai.createChatCompletion(prompt);

    res.status(200).json({response: response.data.choices[0]});
};

export default handler;
