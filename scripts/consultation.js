// Inititate html objects to be manipulated
const messages = document.querySelector('.messages');
const input = document.getElementById('user-input');
const button = document.getElementById('send-btn');
const loading = document.getElementById('loading');

// initialize empty variables 
let chatCnt = 0;
let userMessages = [];
let assistantMessages = [];


/** Inserts a chatbox into the consultation.html page
 * @returns {void} - Only manipulates DOM to build a chatbox with a welcome message
 */
function startChat() {
    document.getElementById("intro-container").style.display = "none";
    document.getElementById("intro-question").style.display = "none";
    document.getElementById("info-container").style.display = "none";
    document.getElementById("chat").style.display = "block";
    let welcomeMsg = "Hello!\n"+ 
                    "Are you struggling with habit formation?\n" +
                    "Do you find yourself procrastinating on tasks?\n" +
                    "Or do you need guidance on a particular issue?\n" +
                    "I will work with you to solve your problems and help you live a more balanced life!"
    appendMessage(welcomeMsg, 'bot');
}


//Add event listener when an user enters afeter typing messages
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});


/** Inserts text into the chatbox
 * @param {string} text - The message which is to be inserted to the DOM 
 * @param {string} sender - To identify if the sender is 'bot' or 'me'
 * @return {none} - Only manipulates DOM
 */
function appendMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message');
    message.classList.add(sender.toLowerCase());
    message.innerText = text;
    
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    
    if (sender == "me") {
        userMessages.push(text)
    }

    chatCnt++;
}


/** Request chatGPT API server for response to message appended the last in the chatbox
 * @returns {void} - 
 */
async function sendMessage() {
    const query = input.value;
    if (!query) return;
    appendMessage(query, 'me');
    input.value = '';
    loadingOn();
    try {
        const response = await fetch("http://localhost:3000/consultation", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({ "userMessages": userMessages, "assistantMessages": assistantMessages }),
        })
        const prediction = await response.json();
        appendMessage(prediction.assistant, 'bot');
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error occurred.:' + error)
    } finally {
        loadingOff();
        document.getElementById("intro-message").innerHTML = ""
    }
}


/** Inserts 'loading' visual when waiting for a response from OpenAI server
 * @returns {void} - Only manipulates DOM
 */
function loadingOn() {
    loading.style.display = 'block'
}


/** Removes 'loading' visual when response from OpenAI is loaded
 * @returns {void} - Only manipulates DOM
*/
function loadingOff() {
    loading.style.display = 'none'
    button.disabled = false;
}