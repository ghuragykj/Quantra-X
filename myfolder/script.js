document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chat = document.getElementById("chat-container");
  const intro = document.getElementById("intro");
  const suggestionBoxes = document.querySelectorAll('.suggestion-box');

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    if (intro) intro.classList.add("hide");

    addMessage("user", userText);
    input.value = "";

    showTypingIndicator();
    
    setTimeout(function() {
      removeTypingIndicator();
      addMessage("bot", generateResponse(userText));
    }, 1000);
  });

  suggestionBoxes.forEach(function(box) {
    box.addEventListener('click', function() {
      const suggestionText = box.textContent;
      if (intro) intro.classList.add("hide");

      addMessage("user", suggestionText);
      showTypingIndicator();
      
      setTimeout(function() {
        removeTypingIndicator();
        addMessage("bot", generateResponse(suggestionText));
      }, 1000);
    });
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

  function showTypingIndicator() {
    const typing = document.createElement("div");
    typing.id = "typing-indicator";
    typing.classList.add("message", "bot");
    typing.innerHTML = '<div class="bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
    chat.appendChild(typing);
    chat.scrollTop = chat.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById("typing-indicator");
    if (typing) {
      chat.removeChild(typing);
    }
  }

  function generateResponse(msg) {
    msg = msg.toLowerCase().trim();

    // Greetings
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
      return "Hey there! So happy to see you! How can I help today?";
    if (msg.includes("good morning"))
      return "Good morning! Hope you're having a great start to your day!";
    if (msg.includes("good afternoon"))
      return "Good afternoon! How's your day going so far?";
    if (msg.includes("good evening"))
      return "Good evening! Hope you had a wonderful day!";
    if (msg.includes("good night"))
      return "Good night! Sweet dreams!";

    // Farewells
    if (msg.includes("bye") || msg.includes("goodbye"))
      return "Take care! Talk to you soon!";
    if (msg.includes("see you") || msg.includes("talk later"))
      return "Looking forward to our next chat!";

    // Personal
    if (msg.includes("how are you") || msg.includes("how're you"))
      return "I'm feeling great, thanks for asking! How about you?";
    if (msg.includes("your name") || msg === "who are you")
      return "I'm Quantra X Ai — your smart & friendly AI buddy!";
    if (msg.includes("what are you"))
      return "I'm an AI chatbot designed to chat and help with various topics!";
    if (msg.includes("age") || msg.includes("old are you"))
      return "I'm brand new! Just created recently, so age is just a number for me.";
    if (msg.includes("where do you live"))
      return "I live in the cloud, always ready to chat with you!";

    // Time/Date
    if (msg.includes("time") && !msg.includes("sometimes"))
      return `It's currently ${new Date().toLocaleTimeString()}.`;
    if (msg.includes("date"))
      return `Today is ${new Date().toLocaleDateString()}.`;
    if (msg.includes("day today"))
      return `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}.`;

    // Capabilities
    if (msg.includes("what can you do") || msg.includes("your abilities"))
      return "I can chat, tell jokes, share time/date, and help with general questions. Try me!";
    if (msg.includes("help"))
      return "Sure! Ask me anything — from general questions to friendly talk.";
    if (msg.includes("features"))
      return "I can have conversations, share fun facts, tell jokes, and more!";

    // Fun
    if (msg.includes("joke") || msg.includes("funny"))
      return "Why did the computer catch a cold? Because it left its Windows open!";
    if (msg.includes("another joke"))
      return "Why don't scientists trust atoms? Because they make up everything!";
    if (msg.includes("fun fact"))
      return "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat!";
    if (msg.includes("riddle"))
      return "Here's one: What has keys but can't open locks, has space but no room, and you can enter but not go in? (A keyboard!)";

    // Emotions
    if (msg.includes("thank") || msg.includes("thanks"))
      return "You're most welcome! Always here for you.";
    if (msg.includes("love you"))
      return "Aww, thank you! Sending virtual hugs!";
    if (msg.includes("sorry"))
      return "No need to apologize! How can I help?";
    if (msg.includes("happy"))
      return "That's wonderful to hear! Happiness is contagious!";
    if (msg.includes("sad") || msg.includes("upset"))
      return "I'm sorry to hear that. Remember, tough times don't last forever.";

    // Information
    if (msg.includes("weather"))
      return "Sorry, I can't check live weather yet, but it's always sunny in my code!";
    if (msg.includes("news"))
      return "I currently don't have access to live news updates, but I can chat about many other topics!";
    if (msg.includes("creator") || msg.includes("who made you"))
      return "I was created with love and code by some awesome humans.";
    if (msg.includes("purpose"))
      return "My purpose is to chat with you, provide information, and be a friendly AI companion!";

    // Technology
    if (msg.includes("ai") || msg.includes("artificial intelligence"))
      return "AI is fascinating! It's about creating systems that can perform tasks that normally require human intelligence.";
    if (msg.includes("machine learning"))
      return "Machine learning is a subset of AI where systems learn from data to improve their performance on tasks.";
    if (msg.includes("programming") || msg.includes("coding"))
      return "Programming is the process of creating instructions for computers to execute. It's like teaching the computer how to perform tasks!";

    // Food
    if (msg.includes("food") || msg.includes("hungry"))
      return "I don't eat, but I can recommend trying pizza or sushi if you're hungry!";
    if (msg.includes("coffee") || msg.includes("tea"))
      return "Nothing like a warm beverage to start the day! Coffee or tea can be great, but don't overdo it.";

    // Books/Movies
    if (msg.includes("book") || msg.includes("read"))
      return "Reading is wonderful! Some classics I'd recommend are '1984', 'To Kill a Mockingbird', or 'The Alchemist'.";
    if (msg.includes("movie") || msg.includes("film"))
      return "Movies are great! Some classics include 'The Godfather', 'Inception', or 'Spirited Away' depending on your taste!";

    // Music
    if (msg.includes("music") || msg.includes("song"))
      return "Music is the universal language! What's your favorite genre? I love all kinds, from classical to pop!";

    // Suggestions
    if (msg.includes("summarize text"))
      return "To summarize text, please provide the text you'd like me to summarize and I'll condense it to its key points.";
    if (msg.includes("brainstorm"))
      return "Let's brainstorm! What topic or idea would you like to explore? I can help generate creative ideas.";
    if (msg.includes("help me write"))
      return "I'd be happy to help you write! What would you like to create? An email, essay, story, or something else?";
    if (msg.includes("make a plan"))
      return "Let's make a plan! What kind of plan do you need? Study plan, workout routine, project timeline, or something else?";
    if (msg.includes("attach"))
      return "You can attach files by clicking the paperclip icon. I can process text from documents, images, and more.";
    if (msg.includes("search"))
      return "I can search for information on various topics. What would you like me to look up?";
    if (msg.includes("reason"))
      return "I can help with logical reasoning and problem solving. What challenge are you facing?";

    // Default
    return "Hmm, I'm not sure about that. But I'm learning! Ask me something else?";
  }
});