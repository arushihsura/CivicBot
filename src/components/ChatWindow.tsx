import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { Loader2 } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  isTyping?: boolean;
}

export function ChatWindow({ messages, isTyping }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl text-white">🏛️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to CivicBot</h2>
            <p className="text-gray-600 mb-6">
              Your AI assistant for civic awareness. Ask me about your rights, legal procedures, 
              emergency protocols, or any civic issue you need help with.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-800">
                <strong>Rights & Duties</strong><br />
                Understand your constitutional rights
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-green-800">
                <strong>Legal Help</strong><br />
                Learn about legal procedures
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-orange-800">
                <strong>Civic Issues</strong><br />
                Report and resolve local problems
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-red-800">
                <strong>Emergency</strong><br />
                Get help in urgent situations
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">🤖</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-500">CivicBot is typing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}