const express = require('express');
const fetch = require('node-fetch'); // Importa 'node-fetch' para hacer solicitudes HTTP
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const app = express();
app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes

// Obtiene la clave API de OpenAI desde las variables de entorno
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Define el endpoint /api/ask
app.post('/api/ask', async (req, res) => {
    const userInput = req.body.message; // Captura el mensaje enviado desde el frontend

    try {
        // Realiza una solicitud a la API de OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}` // Autenticación con la clave API
            },
            body: JSON.stringify({
                model: 'gpt-4', // Cambia este modelo si estás usando otro
                messages: [{ role: 'user', content: userInput }],
                max_tokens: 150 // Limita la respuesta del modelo
            })
        });

        const data = await response.json();

        // Validar que la respuesta sea válida antes de acceder a choices
        if (!data.choices || data.choices.length === 0) {
            console.error('Respuesta inesperada de OpenAI:', data);
            return res.status(500).json({ error: 'Respuesta inválida de OpenAI' });
        }

        // Si la respuesta es válida, envía el contenido al cliente
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Error en la solicitud a OpenAI:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

// Configuración del puerto para el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});


