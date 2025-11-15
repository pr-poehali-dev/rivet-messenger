import { LanguageMode } from '../pages/Index';
import Icon from '@/components/ui/icon';

interface ContactsViewProps {
  languageMode: LanguageMode;
}

function ContactsView({ languageMode }: ContactsViewProps) {
  const translations = {
    title: {
      standard: 'Контакты',
      zoomer: 'Мои корешá',
      boomer: 'Адресная книга'
    },
    addContact: {
      standard: 'Добавить',
      zoomer: 'Добавить',
      boomer: 'Новый'
    }
  };

  const contacts = [
    { id: '1', name: 'Саша', avatar: '🎨', status: 'В сети', mood: '✨' },
    { id: '2', name: 'Макс', avatar: '🎮', status: 'Был(а) 5 мин назад', mood: '😎' },
    { id: '3', name: 'Анна', avatar: '📚', status: 'В сети', mood: '🌸' },
    { id: '4', name: 'Дима', avatar: '⚡', status: 'Был(а) час назад', mood: '🔥' }
  ];

  return (
    <div className="p-5 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{translations.title[languageMode]}</h2>
        <button className="bg-accent hover:bg-accent/90 active:scale-95 text-white px-4 py-2.5 rounded-[1.25rem] text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
          <Icon name="UserPlus" size={18} strokeWidth={2.5} />
          {translations.addContact[languageMode]}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-light-surface p-4 rounded-[1.75rem] hover:bg-accent/5 active:scale-[0.98] transition-all duration-200 cursor-pointer border border-border/30 hover:border-accent/30 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center text-xl border-2 border-accent/25 shadow-sm">
                  {contact.avatar}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-light-surface border-2 border-light-bg flex items-center justify-center text-xs shadow-md">
                  <span className="animate-pulse-mood">{contact.mood}</span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.status}</p>
              </div>

              <button className="text-muted-foreground hover:text-accent active:scale-90 transition-all p-2 rounded-full hover:bg-accent/10">
                <Icon name="MessageCircle" size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactsView;
