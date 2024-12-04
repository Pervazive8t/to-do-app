document.getElementById('submit-btn').addEventListener('click', async () => {
    const input = document.getElementById('to-do-input').value;
    const apiKey = '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'; // Replace with your OpenAI API key
    const url = "https://api.openai.com/v1/chat/completions";

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    };

    const body = {
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a creative assistant that is good to create to-do lists and plan them accordingly!" },
            { role: "user", content: input },
        ],
        temperature: 0.7,
        max_tokens: 200,
    };

    try {
        const response = await axios.post(url, body, { headers });
        const result = response.data.choices[0].message.content.trim();
        document.getElementById('response').innerText = result;
    } catch (error) {
        console.error(error);
    }
});