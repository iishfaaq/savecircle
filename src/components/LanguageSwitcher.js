import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'si', label: 'සිංහල' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          style={{ margin: 4, fontWeight: i18n.language === lang.code ? 'bold' : 'normal' }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
