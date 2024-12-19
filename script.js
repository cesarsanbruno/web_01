async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const responseDiv = document.getElementById('response');
    const assistantUrl = "https://platform.openai.com/assistants/asst_6TFVNCLKzj9luJzbpWFIBXmC";

    if (!userInput.trim()) {
        responseDiv.innerText = "Por favor, escribe una pregunta.";
        return;
    }

    responseDiv.innerHTML = `Redirigiendo al asistente... <a href="${assistantUrl}" target="_blank">Haz clic aquí si no se abre automáticamente.</a>`;
    window.open(assistantUrl, "_blank");
}
