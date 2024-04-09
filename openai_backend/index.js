// Due to the connection errors between Firebase and OpenAI API, We host consultation page to an independent page (https://comp1800dtc04.pages.dev)
// The website's code and this code are the basically same

// Imports necessary libraies for interacting with OpebAL's API and creating web server.
const OpenAI = require("openai");
const express = require('express');
const app = express();

const constants = require('./constants.json');
const openai = new OpenAI(
    {apiKey: constants.API_KEY}
);

// Resolve CORS issues
var cors = require('cors');
app.use(cors());

// make our app to be able to receive POST request
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); 

// Receive GET reuqest(for debuggin purpose)
app.get('/', function(req, res) {
  res.send('Welcome Server World');
});
  
// This is core route that handles the conversational interaction with AI assistant.
// Data extraction: It extracts userMessages and assistantMessages from the incoming request's body
app.post('/consultation', async function (req, res) {
    console.log(req.body);
    let {userMessages, assistantMessages} = req.body

    // Message formatting and OPenAI Call
    let messages = [
        {role: "system", content: constants.SYSTEM_COMMENT},
        {role: "user", content: constants.USER_COMMENT},
        {role: "assistant", content: constants.ASSISTANT_COMMENT},
    ]

    // an array of an object messages are contained in messages
    while (userMessages.length != 0 || assistantMessages.length != 0) {
        if (userMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "user", "content": "'+ 
                  String(userMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
        // same logic as the above, but assistant role
        if (assistantMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "assistant", "content": "'+
                  String(assistantMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
    }


    // This sends request to OpenAI server with the made message
    // If errors happens, it tries twice more
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

    // This returns the result and make it as a json format
    let chatGPTResult = completion.choices[0].message.content
    console.log(chatGPTResult);
    res.json({"assistant": chatGPTResult});
});

// This starts Express server, listening for requests on port 3000.
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});