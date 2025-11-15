import { useState } from 'react';
import ChatsView from '../components/ChatsView';
import ContactsView from '../components/ContactsView';
import ProfileView from '../components/ProfileView';
import ChatWindow from '../components/ChatWindow';
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
    <div className="min-h-screen bg-dark-bg text-white flex flex-col dark">
      <header className="bg-dark-surface border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-scale-in">
            <span className="text-lg font-bold">R</span>
          </div>
          <h1 className="text-2xl font-bold">Rivet</h1>
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

      <nav className="bg-dark-surface border-t border-white/10 px-6 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'chats' 
                ? 'text-accent scale-110' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon name="MessageCircle" size={24} />
            <span className="text-xs">{translations.chats[languageMode]}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'contacts' 
                ? 'text-accent scale-110' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon name="Users" size={24} />
            <span className="text-xs">{translations.contacts[languageMode]}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'profile' 
                ? 'text-accent scale-110' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs">{translations.profile[languageMode]}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Index;
