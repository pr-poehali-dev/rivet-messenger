import { Chat, LanguageMode } from '../pages/Index';
import Icon from '@/components/ui/icon';

interface ChatsViewProps {
  chats: Chat[];
  onChatSelect: (chat: Chat) => void;
  languageMode: LanguageMode;
}

function ChatsView({ chats, onChatSelect, languageMode }: ChatsViewProps) {
  const translations = {
    newChat: {
      standard: 'Новый чат',
      zoomer: 'Кому пишем?',
      boomer: 'Начать переписку'
    },
    search: {
      standard: 'Поиск...',
      zoomer: 'Искать...',
      boomer: 'Найти контакт...'
    }
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={translations.search[languageMode]}
            className="w-full bg-dark-surface text-white pl-10 pr-4 py-3 rounded-2xl border border-white/10 focus:border-accent focus:outline-none transition-colors"
          />
        </div>
        <button className="bg-accent hover:bg-accent/90 text-white p-3 rounded-2xl transition-all duration-200 hover:scale-105">
          <Icon name="Plus" size={20} />
        </button>
      </div>

      <div className="space-y-2">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="w-full bg-dark-surface hover:bg-dark-surface/80 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-2xl border-2 border-accent/30">
                  {chat.avatar}
                </div>
                {chat.mood && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-dark-bg border-2 border-dark-surface flex items-center justify-center text-sm animate-pulse-mood">
                    {chat.mood}
                  </div>
                )}
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white group-hover:text-accent transition-colors">{chat.name}</h3>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
              </div>

              {chat.unread > 0 && (
                <div className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full min-w-[24px] text-center animate-scale-in">
                  {chat.unread}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChatsView;
