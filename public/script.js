async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const responseDiv = document.getElementById('response');

    if (!userInput.trim()) {
        responseDiv.innerText = "Por favor, escribe una pregunta.";
        return;
    }

    responseDiv.innerText = "Pensando...";

    try {
        const response = await fetch('https://backend-openai.vercel.app/api/ask', { // Cambia esta URL a la del backend en Vercel
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();

        if (data.response) {
            responseDiv.innerText = data.response;
        } else {
            responseDiv.innerText = "Hubo un problema al obtener la respuesta.";
        }
    } catch (error) {
        responseDiv.innerText = "Error al procesar la solicitud.";
        console.error(error);
    }
}
