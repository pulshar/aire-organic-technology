import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const FloatingButton: React.FC<{ isOpen: boolean; onClick: () => void }> = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className={`fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg hover:scale-110 cursor-pointer ${isOpen ? 'bg-aire-text rotate-90' : 'bg-white'}`}
  >
    {isOpen ? (
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <span className="font-serif text-xl font-medium italic tracking-tighter text-aire-text mb-0.5">Ai</span>
    )}
  </button>
);

const MessageList: React.FC<{ messages: ChatMessage[]; isTyping: boolean; endRef: React.RefObject<HTMLDivElement | null> }> = ({ messages, isTyping, endRef }) => (
  <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-gradient-to-b from-white/20 to-aire-paper/20">
    {messages.map((msg) => (
      <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[85%] p-3 rounded-lg text-sm font-sans leading-relaxed ${msg.role === 'user' ? 'bg-aire-text text-aire-bg' : 'bg-white shadow-sm text-aire-text'}`}>
          {msg.text}
        </div>
      </div>
    ))}
    {isTyping && (
      <div className="flex justify-start">
        <div className="bg-white shadow-sm p-4 rounded-lg flex gap-1">
          <div className="w-1.5 h-1.5 bg-aire-stone rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-aire-stone rounded-full animate-bounce delay-100"></div>
          <div className="w-1.5 h-1.5 bg-aire-stone rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    )}
    <div ref={endRef} />
  </div>
);

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'welcome',
    role: 'model',
    text: 'Bienvenido a Aire. Soy tu guía en esta atmósfera. ¿Buscas serenidad o función?',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await getGeminiResponse(userMsg.text);
    const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };

    setMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  };

  return (
    <>
      <FloatingButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <div className={`fixed bottom-28 right-8 w-80 md:w-96 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-40 transition-all duration-500 origin-bottom-right flex flex-col border border-white/50 ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`} style={{ maxHeight: '600px', height: '60vh' }}>
        <div className="px-6 py-4 bg-aire-bg/50 border-b border-aire-stone/20">
          <h3 className="font-serif text-lg text-aire-text italic">Guía Aire</h3>
          <p className="font-sans text-[10px] text-aire-stone uppercase tracking-widest">Inteligencia Orgánica</p>
        </div>

        <MessageList messages={messages} isTyping={isTyping} endRef={messagesEndRef} />

        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-aire-stone/20">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="¿En qué puedo ayudarte?"
              className="w-full bg-aire-bg px-4 py-3 pr-12 rounded-lg text-sm font-sans text-aire-text focus:outline-none focus:ring-1 focus:ring-aire-stone/30 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-aire-stone hover:text-aire-text disabled:opacity-30 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Assistant;