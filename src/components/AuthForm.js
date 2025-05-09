import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthForm() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [input, setInput] = useState('');

  // Handle Email/Password Auth
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (tab === 0) {
      // Login
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, input, "dummyPassword");
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setIsLogin(true)}>{t('login')}</button>
        <button onClick={() => setIsLogin(false)}>{t('signup')}</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder={t('enter_phone_email')}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">{t('continue')}</button>
      </form>
    </div>
  );
}
