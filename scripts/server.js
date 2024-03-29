
const express = require('express');
const OpenAI = require('openai');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(express.json());

const openai = new OpenAI({
    apiKey: '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'
});

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

async function ask_gpt() {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'tell me what is required for human life in 5words?' }],
        model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0].message.content)
}

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await ask_gpt();
        res.json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

ask_gpt();