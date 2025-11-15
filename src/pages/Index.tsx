import { useState } from 'react';
import ChatsView from '../components/ChatsView';
import ContactsView from '../components/ContactsView';
import ProfileView from '../components/ProfileView';
import ChatWindow from '../components/ChatWindow';
import RivetLogo from '../components/RivetLogo';
import Icon from '@/components/ui/icon';

export type LanguageMode = 'standard' | 'zoomer' | 'boomer';

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  mood?: string;
  moodType?: 'video' | 'gif';
}

function Index() {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'profile'>('chats');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('standard');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const translations = {
    chats: {
      standard: 'Чаты',
      zoomer: 'Инбокс',
      boomer: 'Переписки'
    },
    contacts: {
      standard: 'Контакты',
      zoomer: 'Корешá',
      boomer: 'Адресная книга'
    },
    profile: {
      standard: 'Профиль',
      zoomer: 'Акк',
      boomer: 'Личные данные'
    }
  };

  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Саша',
      avatar: '🎨',
      lastMessage: 'Го в кино сегодня?',
      time: '14:23',
      unread: 2,
      mood: '✨',
      moodType: 'gif'
    },
    {
      id: '2',
      name: 'Команда проекта',
      avatar: '💼',
      lastMessage: 'Марина: Отчет готов',
      time: '12:15',
      unread: 0,
      mood: '🔥',
      moodType: 'video'
    },
    {
      id: '3',
      name: 'Макс',
      avatar: '🎮',
      lastMessage: 'gg wp',
      time: 'Вчера',
      unread: 0,
      mood: '😎',
      moodType: 'gif'
    }
  ];

  if (selectedChat) {
    return (
      <ChatWindow 
        chat={selectedChat} 
        onBack={() => setSelectedChat(null)}
        languageMode={languageMode}
      />
    );
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-light-bg text-foreground flex flex-col shadow-2xl">
      <header className="bg-light-surface/90 backdrop-blur-md border-b border-border/30 px-6 py-5 rounded-b-[2rem] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="text-accent animate-scale-in drop-shadow-md">
            <RivetLogo size={38} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Rivet</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {activeTab === 'chats' && (
          <ChatsView 
            chats={mockChats} 
            onChatSelect={setSelectedChat}
            languageMode={languageMode}
          />
        )}
        {activeTab === 'contacts' && <ContactsView languageMode={languageMode} />}
        {activeTab === 'profile' && (
          <ProfileView 
            languageMode={languageMode}
            onLanguageChange={setLanguageMode}
          />
        )}
      </main>

      <nav className="bg-light-surface/90 backdrop-blur-md border-t border-border/30 px-4 py-4 rounded-t-[2rem] shadow-lg">
        <div className="flex justify-around items-center">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 px-5 py-2.5 rounded-[1.5rem] ${
              activeTab === 'chats' 
                ? 'text-accent bg-accent/10 scale-105 shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name="MessageCircle" size={24} strokeWidth={activeTab === 'chats' ? 2.5 : 2} />
            <span className="text-[11px] font-semibold">{translations.chats[languageMode]}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 px-5 py-2.5 rounded-[1.5rem] ${
              activeTab === 'contacts' 
                ? 'text-accent bg-accent/10 scale-105 shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name="Users" size={24} strokeWidth={activeTab === 'contacts' ? 2.5 : 2} />
            <span className="text-[11px] font-semibold">{translations.contacts[languageMode]}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 px-5 py-2.5 rounded-[1.5rem] ${
              activeTab === 'profile' 
                ? 'text-accent bg-accent/10 scale-105 shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name="User" size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span className="text-[11px] font-semibold">{translations.profile[languageMode]}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Index;
