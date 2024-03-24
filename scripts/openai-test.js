const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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', // This is the default and can be omitted
});

// temporary
const user_messages = [
  { role: "system", content: "A canadian living in Vancouver" },
  { role: "user", content: "Tourist spots to recommend for foreigners, only names" },
]; 

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: user_messages,
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
  });
  console.log(chatCompletion.choices[0].message.content);
}

main();