const responseBox = document.getElementById('response-box');
const input = document.getElementById('text-input');
const sendBtn = document.getElementById('send-button');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-US';

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
}

function wishMe() {
  const hour = new Date().getHours();
  if (hour < 12) speak('Good Morning Commander');
  else if (hour < 18) speak('Good Afternoon Commander');
  else speak('Good Evening Commander');
}

function takeCommand(message) {
  responseBox.textContent = message;

  if (message.includes('hello') || message.includes('hi')) {
    speak('Hello Commander, how may I assist you?');
  } else if (message.includes('open google')) {
    speak('Opening Google');
    window.open('https://google.com', '_blank');
  } else if (message.includes('time')) {
    const time = new Date().toLocaleTimeString();
    speak('The time is ' + time);
  } else {
    speak('Searching for ' + message);
    window.open(`https://www.google.com/search?q=${message}`, '_blank');
  }
}

window.addEventListener('load', () => {
  speak('Initializing Nova AI System');
  wishMe();
  recognition.start();
});

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
  if (transcript.includes("nova")) {
    const command = transcript.replace("nova", "").trim();
    if (command.length > 0) takeCommand(command);
    else speak("Yes Commander?");
  }
};

sendBtn.addEventListener('click', () => {
  const msg = input.value.trim();
  if (msg) {
    takeCommand(msg.toLowerCase());
    input.value = '';
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendBtn.click();
  }
});
