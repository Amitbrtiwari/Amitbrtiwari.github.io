// Enhanced Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const chatbotWidget = document.getElementById('chatbot-widget');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const typingIndicator = document.getElementById('typing-indicator');
  const quickQuestions = document.querySelectorAll('.quick-question');
  
  // Chatbot State
  let isOpen = false;
  let isTyping = false;
  let hasWelcomeMessage = false;
  
  // Enhanced Knowledge Base about Amit
  const knowledgeBase = {
    // [Keep all your existing knowledgeBase content exactly as is]
  };
  
  // Default responses for unknown questions
  const defaultResponses = [
    "I'm not sure about that. Try asking about Amit's education, skills, projects, or how to contact him!",
    "That's an interesting question! Could you rephrase it or ask about Amit's technical background or career goals?",
    "I specialize in questions about Amit's professional background. Try asking about his MCA studies, skills, projects, or job seeking status!",
    "I don't have information about that specifically. You might find it on Amit's portfolio website or contact him directly.",
    "You can ask me about Amit's education at GL Bajaj, his technical skills, projects, or current job search status!"
  ];
  
  // Initialize chatbot
  function initChatbot() {
    // Load chat history from localStorage
    loadChatHistory();
    
    // Event Listeners
    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', closeChatbot);
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !isTyping) {
        sendMessage();
      }
    });
    
    // Enhanced quick questions with more options
    const enhancedQuickQuestions = [
      "Who is Amit?",
      "What is his education?",
      "What are his skills?",
      "What projects has he done?",
      "Is he looking for jobs?",
      "How to contact him?",
      "What is Solutions Engineering?",
      "Where can I see his resume?",
      "What is his GitHub?",
      "Is he available for freelance?"
    ];
    
    // Update quick questions if they exist
    if (quickQuestions.length > 0) {
      quickQuestions.forEach((question, index) => {
        if (enhancedQuickQuestions[index]) {
          question.setAttribute('data-question', enhancedQuickQuestions[index]);
          question.innerHTML = `${getEmojiForQuickQuestion(enhancedQuickQuestions[index])} ${enhancedQuickQuestions[index]}`;
        }
        
        question.addEventListener('click', function() {
          const questionText = this.getAttribute('data-question');
          addUserMessage(questionText);
          processQuestion(questionText.toLowerCase());
        });
      });
    }
    
    // Close chatbot when clicking outside
    document.addEventListener('click', function(e) {
      if (isOpen && 
          !chatbotContainer.contains(e.target) && 
          !chatbotToggle.contains(e.target)) {
        closeChatbot();
      }
    });
    
    // Add greeting based on time of day (only if no history)
    if (!hasWelcomeMessage) {
      addTimeBasedGreeting();
    }
  }
  
  // Clear chat history and show welcome message
  function clearChatHistory() {
    // Clear the messages container
    chatbotMessages.innerHTML = '';
    
    // Reset state
    hasWelcomeMessage = false;
    
    // Add fresh welcome message
    addTimeBasedGreeting();
    
    // Clear localStorage
    localStorage.removeItem('chatbotHistory');
  }
  
  // Add time-based greeting
  function addTimeBasedGreeting() {
    if (hasWelcomeMessage) return;
    
    const hour = new Date().getHours();
    let greeting = "Hello";
    
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";
    
    const greetingMessage = document.createElement('div');
    greetingMessage.className = 'message bot-message';
    greetingMessage.innerHTML = `
      <div class="message-content">
        <p>${greeting}! I'm Amit's assistant. You can ask me about:</p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>His education & MCA studies at GL Bajaj</li>
          <li>Technical skills & projects</li>
          <li>Job seeking status & opportunities</li>
          <li>Contact information & resume</li>
          <li>Solutions Engineering expertise</li>
        </ul>
        <p>Use the quick questions below or type your own!</p>
        <div class="quick-questions">
          ${getQuickQuestionsHTML()}
        </div>
      </div>
      <span class="message-time">${getCurrentTime()}</span>
    `;
    
    chatbotMessages.appendChild(greetingMessage);
    hasWelcomeMessage = true;
    scrollToBottom();
    
    // Save to history
    saveToHistory('bot', greetingMessage.querySelector('.message-content').innerText);
  }
  
  // Generate HTML for quick questions
  function getQuickQuestionsHTML() {
    const questions = [
      "Who is Amit?",
      "What is his education?",
      "What are his skills?",
      "What projects has he done?",
      "Is he looking for jobs?",
      "How to contact him?"
    ];
    
    return questions.map(q => `
      <button class="quick-question" data-question="${q}">
        ${getEmojiForQuickQuestion(q)} ${q}
      </button>
    `).join('');
  }
  
  // Toggle chatbot visibility
  function toggleChatbot() {
    if (isOpen) {
      closeChatbot();
    } else {
      openChatbot();
    }
  }
  
  function openChatbot() {
    isOpen = true;
    chatbotContainer.classList.add('active');
    chatbotToggle.style.transform = 'scale(1.1)';
    
    // Remove notification after opening
    const notification = document.querySelector('.chatbot-notification');
    if (notification) {
      notification.style.display = 'none';
    }
    
    // Focus input
    setTimeout(() => {
      chatbotInput.focus();
    }, 300);
  }
  
  function closeChatbot() {
    isOpen = false;
    chatbotContainer.classList.remove('active');
    chatbotToggle.style.transform = '';
    
    // Clear chat history when closing
    clearChatHistory();
  }
  
  // Add user message to chat
  function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
      <div class="message-content">
        <p>${message}</p>
      </div>
      <span class="message-time">${getCurrentTime()}</span>
    `;
    
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Save to chat history
    saveToHistory('user', message);
  }
  
  // Add bot message to chat
  function addBotMessage(message, isHtml = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    if (isHtml) {
      messageDiv.innerHTML = `
        <div class="message-content">
          ${message}
        </div>
        <span class="message-time">${getCurrentTime()}</span>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${message}</p>
        </div>
        <span class="message-time">${getCurrentTime()}</span>
      `;
    }
    
    // Add follow-up questions if available
    const question = extractQuestion(message.toLowerCase());
    if (question && knowledgeBase[question] && knowledgeBase[question].followup) {
      const followupDiv = document.createElement('div');
      followupDiv.className = 'quick-questions followup-questions';
      
      knowledgeBase[question].followup.forEach(followup => {
        const followupQuestion = getFollowupQuestion(followup);
        if (followupQuestion) {
          const button = document.createElement('button');
          button.className = 'quick-question followup-btn';
          button.setAttribute('data-question', followupQuestion);
          button.innerHTML = `${getEmojiForQuestion(followup)} ${followupQuestion}`;
          button.addEventListener('click', function() {
            addUserMessage(followupQuestion);
            processQuestion(followupQuestion.toLowerCase());
          });
          followupDiv.appendChild(button);
        }
      });
      
      messageDiv.querySelector('.message-content').appendChild(followupDiv);
    }
    
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Save to chat history
    saveToHistory('bot', message);
  }
  
  // Enhanced question processing with better matching
  function processQuestion(question) {
    // Show typing indicator
    showTyping();
    
    // Clear input
    chatbotInput.value = '';
    
    // Simulate thinking delay
    setTimeout(() => {
      hideTyping();
      
      // Clean and normalize question
      const cleanQuestion = question.trim().toLowerCase();
      
      // Find matching answer
      let answer = null;
      let isHtml = false;
      
      // Check for exact match
      if (knowledgeBase[cleanQuestion]) {
        answer = knowledgeBase[cleanQuestion].answer;
        isHtml = true;
      } else {
        // Check for keyword matches
        const keywords = {
          'mca': 'mca',
          'gl bajaj': 'education',
          'fresher': 'seeking',
          'job': 'seeking',
          'hire': 'seeking',
          'opportunity': 'seeking',
          'software': 'skills',
          'web': 'skills',
          'devops': 'skills',
          'docker': 'skills',
          'jenkins': 'skills',
          'project': 'projects',
          'github': 'github',
          'resume': 'resume',
          'contact': 'contact',
          'email': 'contact',
          'phone': 'contact',
          'linkedin': 'contact',
          'experience': 'experience',
          'work': 'experience',
          'solution': 'solutions',
          'advertising': 'solutions',
          'ad tech': 'solutions',
          'technical': 'technical support'
        };
        
        // Check for keyword matches
        for (const [keyword, responseKey] of Object.entries(keywords)) {
          if (cleanQuestion.includes(keyword) && knowledgeBase[responseKey]) {
            answer = knowledgeBase[responseKey].answer;
            isHtml = true;
            break;
          }
        }
        
        // If still no match, check partial matches in knowledge base keys
        if (!answer) {
          for (const key in knowledgeBase) {
            if (cleanQuestion.includes(key) || key.includes(cleanQuestion)) {
              answer = knowledgeBase[key].answer;
              isHtml = true;
              break;
            }
          }
        }
      }
      
      // If no match found, use default response
      if (!answer) {
        const randomIndex = Math.floor(Math.random() * defaultResponses.length);
        answer = defaultResponses[randomIndex];
        isHtml = false;
      }
      
      // Add bot response
      addBotMessage(answer, isHtml);
    }, 800 + Math.random() * 700); // Random delay between 0.8-1.5 seconds
  }
  
  // Send message from input
  function sendMessage() {
    const message = chatbotInput.value.trim();
    
    if (message && !isTyping) {
      addUserMessage(message);
      processQuestion(message.toLowerCase());
    }
  }
  
  // Show typing indicator
  function showTyping() {
    isTyping = true;
    typingIndicator.classList.add('active');
    chatbotSend.disabled = true;
    scrollToBottom();
  }
  
  // Hide typing indicator
  function hideTyping() {
    isTyping = false;
    typingIndicator.classList.remove('active');
    chatbotSend.disabled = false;
  }
  
  // Scroll to bottom of messages
  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // Get current time for message timestamp
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Extract main question from message
  function extractQuestion(message) {
    for (const key in knowledgeBase) {
      if (message.includes(key)) {
        return key;
      }
    }
    return null;
  }
  
  // Get followup question by key
  function getFollowupQuestion(key) {
    const followupMap = {
      'skills': 'What are his technical skills?',
      'experience': 'What is his work experience?',
      'projects': 'What projects has he completed?',
      'github': 'What is his GitHub profile?',
      'resume': 'Where can I see his resume?',
      'education': 'What is his educational background?',
      'contact': 'How can I contact him?',
      'availability': 'Is he available for opportunities?',
      'seeking': 'What roles is he seeking?',
      'solutions': 'What is Solutions Engineering?',
      'solutions skills': 'What are his solution engineering skills?'
    };
    
    return followupMap[key] || 'Tell me more about this';
  }
  
  // Get emoji for quick questions
  function getEmojiForQuickQuestion(question) {
    const emojiMap = {
      'Who is Amit?': '👤',
      'What is his education?': '🎓',
      'What are his skills?': '💻',
      'What projects has he done?': '🚀',
      'Is he looking for jobs?': '💼',
      'How to contact him?': '📞',
      'What is Solutions Engineering?': '⚙️',
      'Where can I see his resume?': '📄',
      'What is his GitHub?': '🐙',
      'Is he available for freelance?': '🤝'
    };
    
    return emojiMap[question] || '❓';
  }
  
  // Get emoji for followup question
  function getEmojiForQuestion(key) {
    const emojiMap = {
      'skills': '💻',
      'experience': '💼',
      'projects': '🚀',
      'github': '🐙',
      'resume': '📄',
      'education': '🎓',
      'contact': '📞',
      'availability': '👨‍💻',
      'seeking': '🎯',
      'solutions': '⚙️',
      'solutions skills': '🔧'
    };
    
    return emojiMap[key] || '❓';
  }
  
  // Save message to chat history
  function saveToHistory(sender, message) {
    let history = JSON.parse(localStorage.getItem('chatbotHistory') || '[]');
    history.push({
      sender: sender,
      message: message,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 messages
    if (history.length > 50) {
      history = history.slice(-50);
    }
    
    localStorage.setItem('chatbotHistory', JSON.stringify(history));
  }
  
  // Load chat history
  function loadChatHistory() {
    const history = JSON.parse(localStorage.getItem('chatbotHistory') || '[]');
    
    // If we have history, set flag and load it
    if (history.length > 0) {
      hasWelcomeMessage = true;
      chatbotMessages.innerHTML = '';
      
      // Add history messages
      history.forEach(item => {
        if (item.sender === 'user') {
          const messageDiv = document.createElement('div');
          messageDiv.className = 'message user-message';
          messageDiv.innerHTML = `
            <div class="message-content">
              <p>${item.message}</p>
            </div>
            <span class="message-time">${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          `;
          chatbotMessages.appendChild(messageDiv);
        } else {
          const messageDiv = document.createElement('div');
          messageDiv.className = 'message bot-message';
          if (item.message.includes('<')) {
            messageDiv.innerHTML = `
              <div class="message-content">
                ${item.message}
              </div>
              <span class="message-time">${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            `;
          } else {
            messageDiv.innerHTML = `
              <div class="message-content">
                <p>${item.message}</p>
              </div>
              <span class="message-time">${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            `;
          }
          chatbotMessages.appendChild(messageDiv);
        }
      });
      
      scrollToBottom();
    }
  }
  
  // Initialize chatbot when page loads
  setTimeout(initChatbot, 1000);
  
  // Add welcome notification after 5 seconds
  setTimeout(() => {
    const notification = document.querySelector('.chatbot-notification');
    if (notification && !isOpen) {
      notification.style.display = 'flex';
      notification.textContent = '💬';
      
      // Animate notification
      notification.style.animation = 'pulse 1s 3';
    }
  }, 5000);
  
  // Add suggested questions on first visit
  setTimeout(() => {
    const hasVisited = localStorage.getItem('chatbotFirstVisit');
    if (!hasVisited && !isOpen) {
      const notification = document.querySelector('.chatbot-notification');
      if (notification) {
        notification.textContent = '?';
        notification.title = 'New: Ask about MCA studies & job search!';
      }
      localStorage.setItem('chatbotFirstVisit', 'true');
    }
  }, 3000);
  
  // Export functions for debugging
  window.chatbot = {
    toggle: toggleChatbot,
    open: openChatbot,
    close: closeChatbot,
    ask: (question) => {
      if (!isOpen) openChatbot();
      setTimeout(() => {
        addUserMessage(question);
        processQuestion(question.toLowerCase());
      }, 300);
    },
    clearHistory: () => {
      clearChatHistory();
    },
    getKnowledge: () => knowledgeBase
  };
});