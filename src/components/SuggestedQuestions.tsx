import React from 'react';
import { MessageSquare } from 'lucide-react';

interface SuggestedQuestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export function SuggestedQuestions({ suggestions, onSuggestionClick }: SuggestedQuestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
        <MessageSquare className="w-4 h-4 mr-2" />
        Suggested questions
      </h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-3 py-2 bg-white text-sm text-gray-700 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}