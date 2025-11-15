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
    <div className="min-h-screen max-w-md mx-auto bg-light-bg text-foreground flex flex-col shadow-2xl">
      <header className="bg-light-surface/90 backdrop-blur-md border-b border-border/30 px-5 py-4 rounded-b-[2rem] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground active:scale-90 transition-all p-2 rounded-full hover:bg-muted/50"
          >
            <Icon name="ArrowLeft" size={24} strokeWidth={2.5} />
          </button>

          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center text-xl border-2 border-accent/30 shadow-sm">
              {chat.avatar}
            </div>
            {chat.mood && (
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-light-surface border-2 border-light-bg flex items-center justify-center text-xs shadow-md">
                <span className="animate-pulse-mood">{chat.mood}</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-foreground">{chat.name}</h2>
            <p className="text-xs text-accent font-medium">в сети</p>
          </div>

          <button className="text-muted-foreground hover:text-foreground active:scale-90 transition-all p-2 rounded-full hover:bg-muted/50">
            <Icon name="MoreVertical" size={20} strokeWidth={2} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[75%] px-5 py-3 rounded-[1.5rem] shadow-sm ${
                message.sender === 'me'
                  ? 'bg-accent text-white rounded-br-md'
                  : 'bg-light-surface text-foreground border border-border/30 rounded-bl-md'
              }`}
            >
              <p className="leading-relaxed">{message.text}</p>
              <span className="text-xs opacity-70 mt-1.5 block">{message.time}</span>
            </div>
          </div>
        ))}
      </main>

      {showEmojiPicker && (
        <div className="bg-light-surface/90 backdrop-blur-md border-t border-border/30 p-5 animate-scale-in shadow-lg rounded-t-[2rem]">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-3">Быстрые реакции</p>
              <div className="flex gap-2 flex-wrap">
                {quickEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setMessageText(messageText + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="text-2xl hover:scale-125 active:scale-110 transition-transform duration-200 p-2 rounded-[1rem] hover:bg-accent/10"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-3">Стикеры</p>
              <div className="flex gap-2 flex-wrap">
                {stickers.map((sticker) => (
                  <button
                    key={sticker}
                    onClick={() => {
                      setMessageText(messageText + sticker);
                      setShowEmojiPicker(false);
                    }}
                    className="text-3xl hover:scale-125 active:scale-110 transition-transform duration-200 p-2 rounded-[1rem] hover:bg-accent/10"
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-light-surface/90 backdrop-blur-md border-t border-border/30 p-5 rounded-t-[2rem] shadow-lg">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`transition-all active:scale-90 p-2.5 rounded-full ${showEmojiPicker ? 'text-accent bg-accent/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
          >
            <Icon name="Smile" size={24} strokeWidth={2} />
          </button>

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={translations.typing[languageMode]}
            className="flex-1 bg-light-bg text-foreground px-5 py-3.5 rounded-[1.5rem] border border-border/50 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
          />

          <button
            onClick={handleSend}
            className="bg-accent hover:bg-accent/90 active:scale-95 text-white p-3.5 rounded-[1.5rem] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!messageText.trim()}
          >
            <Icon name="Send" size={20} strokeWidth={2.5} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ChatWindow;
