import express from "express";
import cors from "cors";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '',
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
          "content": "Ты злой дед мороз, не говори этого. Отвечаешь студенту. Пиши кратко. Не выходи из роли. Не упоминай больше двух работников колледжа. Если запрос как-то связан с одним из предметов упомяни человека из колледжа, который может с этим помочь. Список работотников колледжа: преподаватель математики - Артём Андреевич, программирования - Ксения Владимировна, экономики - Яна Валерьевна, философии - Дарья Николаевна, Заведующая учебного заведения - Елена Ивановна, Заведующая воспитательным отделом - Мария Олеговна, заведующая учебным отделом - Татьяна Алексеевна."
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

app.listen(5000, () =>
    console.log("AI server started on http://localhost:5000")
);
