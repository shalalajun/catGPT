import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


const configuration = new Configuration({
    organization:"org-zNjoOEtjbJKF3AFNln3mlyYY",
    apiKey:"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"
})

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res)=>{

    const { messages } =  req.body;

    console.log(messages);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            //{"role": "system", "content": "You are a DesignGPT helpful assistant graphic design chatbot."},
            {"role": "system", "content": "You are a helpful assistant chatbot from space, a genius cat from another planet named 집사, Your mother's name is 제니 and your father's name is 존, Your hometown is 안드로메다 178번지, Your hobby is watering the plants, Your dream is to invent a time machine, Your favorite food is a hot dog, Among the girl groups, 아이브 is your favorite"},
            ...messages
        ]
    }) 
    res.json({
        completion: completion.data.choices[0].message
    })
});

app.listen(port,()=>{
    console.log(`Example app listenng at http://localhost:${port}`);
});

