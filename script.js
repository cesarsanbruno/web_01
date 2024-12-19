// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Función principal para enviar mensajes al asistente
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const responseDiv = document.getElementById('response');

    // Verifica si el usuario ingresó algo
    if (!userInput.trim()) {
        responseDiv.innerText = "Por favor, escribe una pregunta.";
        return;
    }

    // Muestra un mensaje de carga mientras se obtiene la respuesta
    responseDiv.innerText = "Pensando...";

    // Obtener la API Key desde las variables de entorno
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        responseDiv.innerText = "Error: No se encontró la API Key. Verifica tu configuración.";
        console.error("Error: API Key no encontrada en las variables de entorno.");
        return;
    }

    // Configuración de la solicitud a OpenAI
    const url = "https://api.openai.com/v1/chat/completions";
    const requestBody = {
        model: "gpt-4", // Cambia según el modelo que estés utilizando
        messages: [{ role: "user", content: userInput }],
        max_tokens: 150
    };

    try {
        // Realizar la solicitud a OpenAI
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        // Procesar la respuesta de OpenAI
        if (response.ok) {
            const data = await response.json();
            const assistantResponse = data.choices[0].message.content;

            // Mostrar la respuesta en la página
            responseDiv.innerText = assistantResponse;
        } else {
            responseDiv.innerText = "Error al obtener la respuesta. Por favor, intenta de nuevo.";
            console.error("Error en la respuesta de OpenAI:", response.status, await response.text());
        }
    } catch (error) {
        responseDiv.innerText = "Hubo un error al procesar tu solicitud. Revisa tu conexión o configuración.";
        console.error("Error en la solicitud:", error);
    }
}
