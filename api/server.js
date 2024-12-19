const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/ask', async (req, res) => {
    const userInput = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: userInput }],
                max_tokens: 150
            })
        });

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

