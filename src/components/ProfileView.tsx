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
    <div className="p-5 space-y-6 animate-fade-in max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground">{translations.profile[languageMode]}</h2>

      <div className="bg-light-surface/80 backdrop-blur-sm p-6 rounded-[2rem] shadow-md border border-border/30 space-y-5">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-5xl border-4 border-accent/30 transition-all duration-300 group-hover:scale-105 shadow-lg">
              👤
            </div>
            <button className="absolute bottom-1 right-1 bg-accent hover:bg-accent/90 active:scale-90 text-white p-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
              <Icon name="Camera" size={18} strokeWidth={2.5} />
            </button>
          </div>
          <button className="text-accent hover:text-accent/80 active:scale-95 text-sm font-semibold transition-all">
            {translations.changeAvatar[languageMode]}
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-medium">{translations.textStatus[languageMode]}</label>
          {isEditingStatus ? (
            <input
              type="text"
              value={textStatus}
              onChange={(e) => setTextStatus(e.target.value)}
              onBlur={() => setIsEditingStatus(false)}
              className="w-full bg-light-bg text-foreground px-4 py-3.5 rounded-[1.25rem] border-2 border-accent focus:outline-none shadow-sm"
              autoFocus
            />
          ) : (
            <div
              onClick={() => setIsEditingStatus(true)}
              className="w-full bg-light-bg text-foreground px-4 py-3.5 rounded-[1.25rem] border border-border/50 hover:border-accent/60 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
            >
              {textStatus}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground font-medium">{translations.moodStatus[languageMode]}</label>
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-accent/15 to-accent/5 border-2 border-accent/30 flex items-center justify-center text-4xl shadow-md">
              <span className="animate-pulse-mood">✨</span>
            </div>
            <button className="flex-1 bg-light-bg hover:bg-accent/5 active:scale-[0.98] text-accent px-4 py-3.5 rounded-[1.25rem] border border-accent/40 hover:border-accent transition-all duration-200 font-semibold shadow-sm flex items-center justify-center gap-2">
              <Icon name="Video" size={18} strokeWidth={2.5} />
              Записать Mood
            </button>
          </div>
        </div>
      </div>

      <div className="bg-light-surface/80 backdrop-blur-sm p-6 rounded-[2rem] shadow-md border border-border/30 space-y-4">
        <h3 className="font-semibold text-lg text-foreground">{translations.languageMode[languageMode]}</h3>
        
        <div className="space-y-2.5">
          {(['standard', 'zoomer', 'boomer'] as LanguageMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onLanguageChange(mode)}
              className={`w-full px-5 py-4 rounded-[1.5rem] text-left transition-all duration-200 active:scale-[0.98] shadow-sm ${
                languageMode === mode
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-light-bg text-muted-foreground hover:bg-accent/5 hover:text-foreground border border-border/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{translations[mode][languageMode]}</span>
                {languageMode === mode && <Icon name="Check" size={20} strokeWidth={2.5} />}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 bg-accent/5 rounded-[1.5rem] border border-accent/20">
          <p className="text-sm text-muted-foreground leading-relaxed">
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
