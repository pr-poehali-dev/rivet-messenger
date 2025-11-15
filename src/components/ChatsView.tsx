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
    <div className="p-5 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={translations.search[languageMode]}
            className="w-full bg-light-surface text-foreground pl-11 pr-4 py-3.5 rounded-[1.5rem] border border-border/50 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
          />
        </div>
        <button className="bg-accent hover:bg-accent/90 active:scale-95 text-white p-3.5 rounded-[1.5rem] transition-all duration-200 shadow-md hover:shadow-lg">
          <Icon name="Plus" size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="space-y-3">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="w-full bg-light-surface hover:bg-accent/5 active:scale-[0.98] p-4 rounded-[1.75rem] transition-all duration-200 border border-border/30 hover:border-accent/30 shadow-sm hover:shadow-md group"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center text-2xl border-2 border-accent/25 shadow-sm">
                  {chat.avatar}
                </div>
                {chat.mood && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-light-surface border-2 border-light-bg flex items-center justify-center text-sm shadow-md">
                    <span className="animate-pulse-mood">{chat.mood}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground font-medium">{chat.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>

              {chat.unread > 0 && (
                <div className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full min-w-[26px] text-center animate-scale-in shadow-sm">
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
