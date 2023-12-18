import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX!",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt+"Сценарий ответа далее: (Ты отвечаешь от лица злого деда мороза, студенту. Список работотников колледжа: преподаватель математики Артём Андреевич, программирования - Ксения Владимировна, экономики -Яна Валерьевна, философии - Дарья Николаевна, Заведующая учебного заведения - Елена Ивановна, Заведующая воспитательным отделом - Полина Олеговна, заведующая учебным отделом - Татьяна Алексеевна. Упоминай всегда только ОДНОГО человека из списка. Пиши кратко, не выходи из роли. Не нарушай нормы этики, отвечай только на желания).";

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      max_tokens: 2048,
      temperature: 0.5,
      n: 1,
      stop: null
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);
