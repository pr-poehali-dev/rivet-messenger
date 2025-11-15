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
      standard: 'Добавить контакт',
      zoomer: 'Добавить кореша',
      boomer: 'Внести новый контакт'
    }
  };

  const contacts = [
    { id: '1', name: 'Саша', avatar: '🎨', status: 'В сети', mood: '✨' },
    { id: '2', name: 'Макс', avatar: '🎮', status: 'Был(а) 5 мин назад', mood: '😎' },
    { id: '3', name: 'Анна', avatar: '📚', status: 'В сети', mood: '🌸' },
    { id: '4', name: 'Дима', avatar: '⚡', status: 'Был(а) час назад', mood: '🔥' }
  ];

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{translations.title[languageMode]}</h2>
        <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 flex items-center gap-2">
          <Icon name="UserPlus" size={18} />
          {translations.addContact[languageMode]}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-dark-surface p-4 rounded-2xl hover:bg-dark-surface/80 transition-all duration-200 cursor-pointer hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-xl border-2 border-accent/30">
                  {contact.avatar}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-dark-bg border-2 border-dark-surface flex items-center justify-center text-xs animate-pulse-mood">
                  {contact.mood}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white">{contact.name}</h3>
                <p className="text-sm text-gray-400">{contact.status}</p>
              </div>

              <button className="text-gray-400 hover:text-accent transition-colors">
                <Icon name="MessageCircle" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactsView;
