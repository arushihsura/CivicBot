import React from 'react';
import { resources } from '../data/resources';
import { Download, ExternalLink, FileText, Phone, BookOpen } from 'lucide-react';

interface ResourceHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResourceHub({ isOpen, onClose }: ResourceHubProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'form':
        return FileText;
      case 'contact':
        return Phone;
      case 'guide':
        return BookOpen;
      default:
        return FileText;
    }
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Resource Hub</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Access official government portals, forms, and important contacts for your civic needs
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => {
              const IconComponent = getResourceIcon(resource.type);
              return (
                <div
                  key={resource.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                      
                      {resource.content && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-xs text-gray-700">{resource.content}</p>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        {resource.downloadUrl && (
                          <button 
                            onClick={() => handleExternalLink(resource.downloadUrl!)}
                            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            <span>Access Portal</span>
                          </button>
                        )}
                        {resource.externalUrl && (
                          <button 
                            onClick={() => handleExternalLink(resource.externalUrl!)}
                            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>View Details</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}