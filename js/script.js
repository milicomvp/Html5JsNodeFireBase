// Este es el archivo JavaScript para manejar la lógica de la llamada a la API de OpenAI


// Instanciamos el cliente API con la URL de tu backend publicado en Vercel
// const apiClient = new ApiClient('https://firebase-node-backend-jj3hl6pcl-estebanreinosos-projects.vercel.app/');
const apiClient = new ApiClient('http://localhost:3000');

// Eventos de Search
document.getElementById('searchButton').addEventListener('click', enviarPregunta);
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        enviarPregunta();
    }
});

let mensajes = [];

async function obtenerApiKey() {
    try {
        const response = await fetch(apiClient.baseUrl + '/api/openai-key',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              }
        }); // Solicita la clave API al backend
        if (!response.ok) {
            throw new Error('No se pudo obtener la clave API');
        }
        const data = await response.json();
        return data.apiKey;
    } catch (error) {
        console.error('Error al obtener la clave API:', error);
        return null;
    }
}
async function enviarPregunta() {
    const pregunta = document.getElementById('searchInput').value;
    if (!pregunta) {
        alert('Por favor, escribe una pregunta.');
        return;
    }

    const apiKey = await obtenerApiKey();
    if (!apiKey) {
        alert('No se pudo obtener la clave API.');
        return;
    }

    // Agregamos la pregunta del usuario a la conversación
    mensajes.push({
        role: 'user',
        content: pregunta
    });

    const respuestaContenedor = document.getElementById('responseContainer');
    respuestaContenedor.textContent = 'Cargando...';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4', // o el modelo que quieras usar
                messages:mensajes,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud a OpenAI');
        }

        const data = await response.json();
        const respuesta = data.choices[0].message.content.trim();

        // Agregamos la respuesta del asistente a la conversación
        mensajes.push({
            role: 'assistant',
            content: respuesta
        });

        respuestaContenedor.textContent = respuesta;
    } catch (error) {
        console.error('Error al conectarse con OpenAI:', error);
        respuestaContenedor.textContent = 'Hubo un error al procesar tu solicitud.';
    }
}
