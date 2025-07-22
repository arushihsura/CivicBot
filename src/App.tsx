import React, { useState, useEffect } from 'react';
import { Menu, MapPin, BookOpen, AlertTriangle, X } from 'lucide-react';
import { Message, CivicTopic, ReportData, Location } from '../types';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { ResourceHub } from './components/ResourceHub';
import { ReportBuilder } from './components/ReportBuilder';
// Import only the response function, not suggestions
import { getGeminiResponse } from '../src/services/gemini';

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  // Remove suggestions-related state
  // const [suggestions, setSuggestions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resourceHubOpen, setResourceHubOpen] = useState(false);
  const [reportBuilderOpen, setReportBuilderOpen] = useState(false);
  const [location, setLocation] = useState({ state: '', city: '' });

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('civicbot-messages');
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    } else {
      // Add welcome message
      const welcomeMessage = {
        id: '1',
        content: 'Hello! I\'m CivicBot, your AI assistant for civic awareness. I can help you understand your rights, duties, legal procedures, and civic processes. What would you like to know today?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('civicbot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Only get AI response, no suggestions
      const aiResponse = await getGeminiResponse(content);
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botResponse]);

      // NO SUGGESTIONS - completely removed

    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: error.message.includes('Rate limited') 
          ? 'I\'m currently receiving too many requests. Please wait a few minutes and try again.'
          : 'I apologize, but I\'m experiencing technical difficulties. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTopicSelect = (topic) => {
    const topicMessage = `Tell me about ${topic.title.toLowerCase()}`;
    handleSendMessage(topicMessage);
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    setMessages([]);
    // Remove suggestions clearing
    // setSuggestions([]);
    setIsTyping(false);
    localStorage.removeItem('civicbot-messages');
    setSidebarOpen(false);
    
    // Add welcome message
    setTimeout(() => {
      const welcomeMessage = {
        id: Date.now().toString(),
        content: 'Hello! I\'m CivicBot, your AI assistant for civic awareness. I can help you understand your rights, duties, legal procedures, and civic processes. What would you like to know today?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }, 100);
  };

  const handleReportSubmit = (report) => {
    const attachmentText = report.attachments && report.attachments.length > 0 
      ? ` with ${report.attachments.length} attachment(s)` 
      : '';
    
    const reportMessage = `I've received your **${report.urgency}** priority report about "${report.type}" at ${report.location}${attachmentText}. 

Your report has been logged and will be forwarded to the relevant authorities. You should receive an acknowledgment within 24-48 hours. 

**Complaint ID:** CB${Date.now()}

For follow-up, you can contact:
- Local Municipal Corporation
- Public Grievance Portal: [https://pgportal.gov.in/](https://pgportal.gov.in/)
- Citizen Service Centers

Thank you for helping improve our community!`;
    
    const botResponse = {
      id: Date.now().toString(),
      content: reportMessage,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, botResponse]);
    setReportBuilderOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        onTopicSelect={handleTopicSelect}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center lg:hidden">
                  <span className="text-xs text-white">🏛️</span>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900">Civic Assistant</h1>
                  <p className="text-xs text-gray-500">AI-powered civic guidance</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLocation({ state: 'Maharashtra', city: 'Mumbai' })}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>{location.city || 'Set Location'}</span>
              </button>
              
              <button
                onClick={() => setResourceHubOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Resources</span>
              </button>
              
              <button
                onClick={() => setReportBuilderOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Report Issue</span>
              </button>
            </div>
          </div>
        </header>

        {/* Chat Window */}
        <ChatWindow messages={messages} isTyping={isTyping} />

        {/* Remove SuggestedQuestions component entirely */}

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>

      {/* Modals */}
      <ResourceHub
        isOpen={resourceHubOpen}
        onClose={() => setResourceHubOpen(false)}
      />
      
      <ReportBuilder
        isOpen={reportBuilderOpen}
        onClose={() => setReportBuilderOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}

export default App;