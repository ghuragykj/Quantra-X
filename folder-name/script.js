const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chat = document.getElementById("chat-container");
const intro = document.getElementById("intro");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  if (intro) intro.classList.add("hide");

  addMessage("user", userText);
  input.value = "";

  const typing = document.createElement("div");
  typing.classList.add("message", "bot");
  typing.innerHTML = `<div class="bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    chat.removeChild(typing);
    addMessage("bot", generateResponse(userText));
  }, 1000);
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = text;
  msg.appendChild(bubble);
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function generateResponse(msg) {
  msg = msg.toLowerCase().trim();
  if (msg.includes("hello") || msg.includes("hi")) return "Hey there! How can I help today?";
  if (msg.includes("bye")) return "Take care! Talk to you soon!";
  if (msg.includes("how are you")) return "I'm great! What about you?";
  if (msg.includes("date")) return `Today is ${new Date().toLocaleDateString()}.`;
  if (msg.includes("time")) return `It's ${new Date().toLocaleTimeString()}.`;
  if (msg.includes("joke")) return "Why don't programmers like nature? It has too many bugs!";
  return "I'm not sure about that. Ask me something else!";
}