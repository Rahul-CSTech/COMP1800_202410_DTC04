// Assign the variables
const messages = document.querySelector('.messages');
const input = document.getElementById('user-input');
const button = document.getElementById('send-btn');
const loading = document.getElementById('loading');
let chatCnt = 0;
let userMessages = [];
let assistantMessages = [];


// When the user firstly clicks the consultation page
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


// Show in the display the response from OpenAI server
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


//Request chatGPT API server
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


// Loading server request
function loadingOn() {
    loading.style.display = 'block'
}


// Loading completed, when server request is loaded
function loadingOff() {
    loading.style.display = 'none'
    button.disabled = false;
}