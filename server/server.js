import express from "express";
import cors from "cors";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Привет!! https://t.me/vaultDV",
  });
});

app.post("/", async (req, res) => {
  try {
    const textPrompt = req.body.textPrompt

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          "role": "system",
          "content": process.env.INSTRUCTIONS || "Ты ИИ",
        },
        {
          "role": "user",
          "content": `${textPrompt}`
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0,
    });

    // console.log(completion.choices[0].message);
    res.status(200).send({
      bot: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

var port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log("AI server started on http://localhost:" + port)
);
