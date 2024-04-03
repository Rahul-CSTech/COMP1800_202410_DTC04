//변수 선언
const messages = document.querySelector('.messages');
const input = document.getElementById('user-input');
const button = document.getElementById('send-btn');
const loading = document.getElementById('loading');
let chatCnt = 0;
let userMessages = [];
let assistantMessages = [];


//처음 들어왔을때
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


//메시지 입력후 엔터키를 입력했을때 이벤트 리스너 추가
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});


//응답 메시지 화면에 뿌리기
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


//chatGPT API 서버에 요청하기
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
        alert('오류가 발생하였습니다.:' + error)
    } finally {
        loadingOff();
        document.getElementById("intro-message").innerHTML = ""
    }
}


// 서버 요청을 기다리는 로딩중
function loadingOn() {
    loading.style.display = 'block'
}


// 서버 요청을 결과 왔을때 로딩완료
function loadingOff() {
    loading.style.display = 'none'
    button.disabled = false;
}