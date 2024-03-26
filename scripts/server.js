import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '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'
});


async function ask_gpt() {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "A psychologist specialising in helping people with habit correction and formation." },
            { role: "user", content: document.getElementById("query").value },
        ],
        model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0].message.content)
}

document.getElementById("submit").addEventListener("click", () => {
    ask_gpt()
})

ask_gpt();
