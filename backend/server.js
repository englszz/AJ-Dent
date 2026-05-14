const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log(process.env.GROQ_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {

    try {

        console.log('BODY RECIBIDO:', req.body);

        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`
                },

                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
                    max_tokens: 300,
                    messages: req.body.messages
                })
            }
        );

        const data = await response.json();

        console.log('RESPUESTA GROQ:', data);

        res.json(data);

    } catch (error) {

        console.error('ERROR:', error);

               res.status(500).json({
            error: 'Error del servidor'
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});