/*
download requirements with npm:
express, axios, cors

node server should be working to connect 3000 OpenAI server.
firewall should be disconnected

firebase can interrupt with OpenAI server
*/

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors'); 


const openaiApiKey = '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';

app.use(express.json());

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo", 
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            }
        });

        res.json({
            text: response.data.choices[0].text
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(cors()); 