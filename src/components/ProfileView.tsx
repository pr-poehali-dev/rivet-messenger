import { LanguageMode } from '../pages/Index';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ProfileViewProps {
  languageMode: LanguageMode;
  onLanguageChange: (mode: LanguageMode) => void;
}

function ProfileView({ languageMode, onLanguageChange }: ProfileViewProps) {
  const [textStatus, setTextStatus] = useState('Чего изволите?');
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const translations = {
    profile: {
      standard: 'Мой профиль',
      zoomer: 'Мой акк',
      boomer: 'Личная карточка'
    },
    changeAvatar: {
      standard: 'Сменить аватар',
      zoomer: 'Апнуть авку',
      boomer: 'Сменить фотографию'
    },
    textStatus: {
      standard: 'Текстовый статус',
      zoomer: 'Че по статусу?',
      boomer: 'Текстовое описание'
    },
    moodStatus: {
      standard: 'Rivet-Mood (видео-статус)',
      zoomer: 'Rivet-Mood',
      boomer: 'Визуальный статус'
    },
    languageMode: {
      standard: 'Языковой режим',
      zoomer: 'Язык интерфейса',
      boomer: 'Режим языка'
    },
    standard: {
      standard: 'Стандартный',
      zoomer: 'Обычный',
      boomer: 'Классический'
    },
    zoomer: {
      standard: 'Зумерский',
      zoomer: 'Зумерский',
      boomer: 'Молодежный'
    },
    boomer: {
      standard: 'Бумерский',
      zoomer: 'Бумерский',
      boomer: 'Традиционный'
    }
  };

  return (
    <div className="p-4 space-y-6 animate-fade-in max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">{translations.profile[languageMode]}</h2>

      <div className="bg-dark-surface p-6 rounded-2xl space-y-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-4xl border-4 border-accent/40 transition-all duration-300 group-hover:scale-105">
              👤
            </div>
            <button className="absolute bottom-0 right-0 bg-accent hover:bg-accent/90 text-white p-2 rounded-full transition-all duration-200 hover:scale-110">
              <Icon name="Camera" size={16} />
            </button>
          </div>
          <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors">
            {translations.changeAvatar[languageMode]}
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">{translations.textStatus[languageMode]}</label>
          {isEditingStatus ? (
            <input
              type="text"
              value={textStatus}
              onChange={(e) => setTextStatus(e.target.value)}
              onBlur={() => setIsEditingStatus(false)}
              className="w-full bg-dark-bg text-white px-4 py-3 rounded-xl border border-accent focus:outline-none"
              autoFocus
            />
          ) : (
            <div
              onClick={() => setIsEditingStatus(true)}
              className="w-full bg-dark-bg text-white px-4 py-3 rounded-xl border border-white/10 hover:border-accent transition-colors cursor-pointer"
            >
              {textStatus}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">{translations.moodStatus[languageMode]}</label>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 flex items-center justify-center text-3xl animate-pulse-mood">
              ✨
            </div>
            <button className="flex-1 bg-dark-bg hover:bg-dark-bg/80 text-accent px-4 py-3 rounded-xl border border-accent/30 hover:border-accent transition-all duration-200 font-medium">
              <Icon name="Video" size={18} className="inline mr-2" />
              Записать новый Mood
            </button>
          </div>
        </div>
      </div>

      <div className="bg-dark-surface p-6 rounded-2xl space-y-4">
        <h3 className="font-semibold text-lg">{translations.languageMode[languageMode]}</h3>
        
        <div className="space-y-2">
          {(['standard', 'zoomer', 'boomer'] as LanguageMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onLanguageChange(mode)}
              className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                languageMode === mode
                  ? 'bg-accent text-white'
                  : 'bg-dark-bg text-gray-400 hover:bg-dark-bg/80 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{translations[mode][languageMode]}</span>
                {languageMode === mode && <Icon name="Check" size={18} />}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 bg-dark-bg rounded-xl border border-accent/20">
          <p className="text-sm text-gray-400 leading-relaxed">
            {languageMode === 'standard' && 'Классический режим интерфейса с привычными формулировками.'}
            {languageMode === 'zoomer' && 'Зумерский стайл интерфейса — чекайте инбокс без кринжа! 🔥'}
            {languageMode === 'boomer' && 'Традиционные формулировки для комфортного пользования приложением.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
