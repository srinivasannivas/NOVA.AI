const send = document.getElementById('send-button');
const input = document.getElementById('text-input');
const responseBox = document.getElementById('response-box');

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

  if (message.includes("nova")) {
    speak("I am listening Commander.");
  } else if (message.includes('hello') || message.includes('hi')) {
    speak('Hello Commander, how may I assist you?');
  } else if (message.includes('tell me a joke')) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything.",
      "I told my computer I needed a break, and it said: No problem, I’ll go to sleep.",
      "Why did the robot go on vacation? Because it needed to recharge!"
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(joke);
  } else if (message.includes('time')) {
    const time = new Date().toLocaleTimeString();
    speak('The time is ' + time);
  } else if (message.includes('date')) {
    const date = new Date().toLocaleDateString();
    speak('Today’s date is ' + date);
  } else if (message.includes('how are you')) {
    speak("I'm always online and ready for you.");
  } else if (message.includes('open')) {
    speak('Opening requested website.');
    const query = message.replace("open", "").trim().replace(/ /g, "+");
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  } else {
    speak('Searching for ' + message);
  }
}

function startRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    takeCommand(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    recognition.stop();
    setTimeout(() => startRecognition(), 1000); // restart after 1 second
  };

  recognition.onend = () => {
    setTimeout(() => startRecognition(), 1000); // restart after 1 second
  };

  recognition.start();
}

window.addEventListener('load', () => {
  speak('Initializing Nova AI System');
  wishMe();
  startRecognition();
});

send.addEventListener('click', () => {
  const msg = input.value.trim();
  if (msg) {
    takeCommand(msg.toLowerCase());
    input.value = '';
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    send.click();
  }
});
