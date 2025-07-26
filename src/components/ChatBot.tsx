import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

type Message = {
  sender: "user" | "bot";
  text: string;
  timestamp?: Date;
  hasDownload?: boolean;
};

const BOT_AVATAR = "🤖";
const USER_AVATAR = "🧑";

// This component now calls the server API for responses.
const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: "bot", 
      text: `Hi! I'm Ganesh Mane's AI assistant 👋\n\nI can answer questions about his skills, projects, experience, and provide a link to download his resume.\n\nWhat would you like to know?`, 
      timestamp: new Date() 
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ✨ ADDED: Function to handle API call and response logic
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = { sender: "user", text: trimmedInput, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Call the backend API
      const apiResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, { message: trimmedInput });
      const { action, text } = apiResponse.data.reply;

      const botReply: Message = { 
        sender: "bot", 
        text: text, 
        timestamp: new Date(),
        // The backend now tells us if a download button is needed
        hasDownload: action === "DOWNLOAD_RESUME" 
      };
      
      setMessages((prev) => [...prev, botReply]);

      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
      
    } catch (error) {
      console.error("Chat API error:", error);
      const errorMessage: Message = {
        sender: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => setIsMinimized(!isMinimized);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Ganesh_Mane_Resume.pdf'; // Ensure PDF is in the /public folder
    link.download = 'Ganesh_Mane_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    const downloadMessage: Message = {
      sender: "bot",
      text: "📥 Resume download started! Check your downloads folder.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, downloadMessage]);
  };

  const quickReplies = ["Download Resume", "Show Projects", "What are his skills?", "Contact Info"];

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    // Use a short timeout to allow state to update before sending
    setTimeout(() => {
      const sendButton = document.getElementById('send-message-button');
      sendButton?.click();
    }, 50);
  };
  
  // ✨ IMPROVED: Mobile-first responsive styles
const getResponsiveStyles = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  if (isMobile) {
    return {
      position: 'fixed' as const,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: isMinimized ? '60px' : '100%',
      borderRadius: 0,
    };
  }

  return {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    width: '400px',
    height: isMinimized ? '60px' : 'clamp(500px, 80vh, 650px)',
    maxWidth: '90vw',
  };
};


  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-5 right-5 z-50 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transform hover:scale-110 transition-all duration-300"
          aria-label="Open Portfolio Assistant"
        >
          <span className="text-2xl">🤖</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={getResponsiveStyles()}
          className="z-50 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slideUp"
        >
          {/* Header */}
          <div className="bg-teal-600 dark:bg-teal-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <span className="text-2xl">👨‍💻</span>
                <span className="absolute -bottom-1 -right-1 bg-green-400 w-3 h-3 rounded-full border-2 border-teal-600"></span>
              </div>
              <div>
                <h3 className="font-bold">Ganesh Mane</h3>
                <p className="text-xs opacity-80">AI Portfolio Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={minimizeChat} className="p-2 rounded-full hover:bg-white/20" title="Minimize">
                {isMinimized ? "🔼" : "🔽"}
              </button>
              <button onClick={toggleChat} className="p-2 rounded-full hover:bg-white/20" title="Close">
                <i className="bi bi-x" style={{ color: 'red', fontSize: '1.5rem' }}></i>
              </button>
            </div>
          </div>

          {/* Messages & Input Area */}
          {!isMinimized && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex items-end gap-2 animate-fadeIn ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === "bot" && <span className="text-2xl self-start">{BOT_AVATAR}</span>}
                    <div className={`max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl shadow-md ${
                      msg.sender === "user"
                        ? "bg-teal-500 text-white rounded-br-lg"
                        : "bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 rounded-bl-lg"
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    {msg.sender === "user" && <span className="text-2xl self-start">{USER_AVATAR}</span>}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-2 animate-pulse">
                    <span className="text-2xl">{BOT_AVATAR}</span>
                    <div className="bg-gray-200 dark:bg-slate-700 rounded-full p-3 flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                )}
                {/* Download Button */}
                {messages[messages.length - 1]?.hasDownload && !isTyping && (
                  <div className="flex justify-start mt-2 ml-10 animate-fadeIn">
                    <button onClick={downloadResume} className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-600 transition flex items-center gap-2">
                      <span>📄</span> Download Resume
                    </button>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="p-2 border-t border-gray-200 dark:border-slate-700">
                <div className="flex flex-wrap gap-2 justify-center">
                  {quickReplies.map((reply) => (
                    <button key={reply} onClick={() => handleQuickReply(reply)} className="px-3 py-1 bg-teal-100 text-teal-800 dark:text-teal-300 rounded-full text-xs hover:bg-teal-200 dark:hover:bg-slate-700 transition">
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900">
                <div className="flex items-center space-x-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 p-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 resize-none bg-gray-50"
                    placeholder="Ask me anything..."
                    disabled={isTyping}
                    rows={1}
                  />
                  <button
                    id="send-message-button"
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="p-2.5 rounded-lg text-white transition-colors disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed bg-teal-500 hover:bg-teal-600"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.544l4.293-1.145a.75.75 0 01.956.956l-1.145 4.293a.75.75 0 00.544.95l4.95 1.414a.75.75 0 00.95-.826l-2.289-8a.75.75 0 00-.95-.544l-7.058 2.353L3.105 2.289z"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Styles */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b7280; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        textarea { height: 44px; }
        textarea:focus { height: 80px; transition: height 0.2s ease; }
      `}</style>
    </>
  );
};

export default ChatBot;