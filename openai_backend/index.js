const OpenAI = require("openai");
const express = require('express');
const app = express();


const constants = require('./constants.json');
const openai = new OpenAI(
    {apiKey: constants.API_KEY}
);

// CORS 이슈 해결
var cors = require('cors');
app.use(cors());


// POST 요청 받을 수 있게 만듬
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); 


// Get 요청 받음
app.get('/', function(req, res) {
  res.send('Welcome Server World');
});
  

// POST method route
app.post('/consultation', async function (req, res) {
    console.log(req.body);
    let {userMessages, assistantMessages} = req.body

    let messages = [
        {role: "system", content: constants.SYSTEM_COMMENT},
        {role: "user", content: constants.USER_COMMENT},
        {role: "assistant", content: constants.ASSISTANT_COMMENT},
    ]

    while (userMessages.length != 0 || assistantMessages.length != 0) {
        if (userMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "user", "content": "'+ 
                  String(userMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
        if (assistantMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "assistant", "content": "'+
                  String(assistantMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
    }

    const maxRetries = 3;
    let retries = 0;
    let completion
    while (retries < maxRetries) {
      try {
        completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages
        });
        break;
      } catch (error) {
          retries++;
          console.log(error);
          console.log(`Error fetching data, retrying (${retries}/${maxRetries})...`);
      }
    }

    let chatGPTResult = completion.choices[0].message.content
    console.log(chatGPTResult);
    res.json({"assistant": chatGPTResult});
});



app.listen(3000, function () {
  console.log('Server is running on port 3000');
});