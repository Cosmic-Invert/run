// Install dependencies: express and axios
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = "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"; // Replace with your actual API key

app.get('/respond', async (req, res) => {
    const question = req.query.question;
    if (!question) {
        return res.status(400).json({ error: "No question provided" });
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: question }]
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply: reply });
    } catch (error) {
        console.error("Error contacting OpenAI:", error);
        res.status(500).json({ error: "Error generating response" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
