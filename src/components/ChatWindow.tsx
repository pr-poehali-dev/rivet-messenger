import { Chat, LanguageMode } from '../pages/Index';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ChatWindowProps {
  chat: Chat;
  onBack: () => void;
  languageMode: LanguageMode;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  type?: 'text' | 'sticker';
  content?: string;
}

function ChatWindow({ chat, onBack, languageMode }: ChatWindowProps) {
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Привет! Как дела?', sender: 'other', time: '14:20' },
    { id: '2', text: 'Отлично! Сегодня классный день', sender: 'me', time: '14:21' },
    { id: '3', text: chat.lastMessage, sender: 'other', time: chat.time }
  ]);

  const translations = {
    typing: {
      standard: 'Сообщение...',
      zoomer: 'Че пишем?',
      boomer: 'Введите текст...'
    },
    send: {
      standard: 'Отправить',
      zoomer: 'Риветнуть',
      boomer: 'Отправить сообщение'
    }
  };

  const handleSend = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'me',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const quickEmojis = ['😊', '👍', '❤️', '😂', '🔥', '✨', '💯', '🎉'];
  const stickers = ['🎨', '🎮', '💼', '🚀', '⚡', '🌟', '🎯', '💡'];

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col dark">
      <header className="bg-dark-surface border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="ArrowLeft" size={24} />
          </button>

          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-lg border-2 border-accent/30">
              {chat.avatar}
            </div>
            {chat.mood && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-dark-bg border border-dark-surface flex items-center justify-center text-xs animate-pulse-mood">
                {chat.mood}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="font-semibold">{chat.name}</h2>
            <p className="text-xs text-gray-400">в сети</p>
          </div>

          <button className="text-gray-400 hover:text-white transition-colors">
            <Icon name="MoreVertical" size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                message.sender === 'me'
                  ? 'bg-accent text-white rounded-br-md'
                  : 'bg-dark-surface text-white rounded-bl-md'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
            </div>
          </div>
        ))}
      </main>

      {showEmojiPicker && (
        <div className="bg-dark-surface border-t border-white/10 p-4 animate-scale-in">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-2">Быстрые реакции</p>
              <div className="flex gap-2 flex-wrap">
                {quickEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setMessageText(messageText + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="text-2xl hover:scale-125 transition-transform duration-200"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2">Стикеры</p>
              <div className="flex gap-2 flex-wrap">
                {stickers.map((sticker) => (
                  <button
                    key={sticker}
                    onClick={() => {
                      setMessageText(messageText + sticker);
                      setShowEmojiPicker(false);
                    }}
                    className="text-3xl hover:scale-125 transition-transform duration-200"
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-dark-surface border-t border-white/10 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`transition-colors ${showEmojiPicker ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
          >
            <Icon name="Smile" size={24} />
          </button>

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={translations.typing[languageMode]}
            className="flex-1 bg-dark-bg text-white px-4 py-3 rounded-2xl border border-white/10 focus:border-accent focus:outline-none transition-colors"
          />

          <button
            onClick={handleSend}
            className="bg-accent hover:bg-accent/90 text-white p-3 rounded-2xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!messageText.trim()}
          >
            <Icon name="Send" size={20} className="animate-rivet" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ChatWindow;
