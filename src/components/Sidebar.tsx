import React from 'react';
import { CivicTopic } from '../types';
import { civicTopics } from '../data/topics';
import * as Icons from 'lucide-react';

interface SidebarProps {
  onTopicSelect: (topic: CivicTopic) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ onTopicSelect, onNewChat, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Icons.Bot className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">CivicBot</h1>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icons.X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">AI for Civic Awareness</p>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={onNewChat}
              className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm"
            >
              <Icons.Plus className="w-5 h-5" />
              <span className="font-medium">New Conversation</span>
            </button>
          </div>

          {/* Topics */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 px-2">Quick Topics</h2>
            <div className="space-y-2">
              {civicTopics.map((topic) => {
                const IconComponent = Icons[topic.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return (
                  <button
                    key={topic.id}
                    onClick={() => onTopicSelect(topic)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm">{topic.title}</h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{topic.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              <p>Made for civic awareness</p>
              <p className="mt-1">Empowering citizens with knowledge</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}