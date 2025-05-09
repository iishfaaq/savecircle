import React, { useState, useEffect } from 'react';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import PaymentMethod from './components/PaymentMethod';
import BottomNav from './components/BottomNav';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import VoiceGoalInput from './components/VoiceGoalInput';
import { translateToEnglish } from './utils/translate';
import { fetchUserGoals } from './utils/firestore';
import SavingsGoals from './components/SavingsGoals';
import WeeklyInsights from './components/WeeklyInsights';

const { t } = useTranslation();

export default function App() {
  const [nav, setNav] = useState(5); // 5 = Profile
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [payment, setPayment] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Fetch user from Firestore (replace 'userId123' with actual user id)
    async function fetchUser() {
      const docSnap = await getDoc(doc(db, "users", "userId123"));
      if (docSnap.exists()) setUser({ id: docSnap.id, ...docSnap.data() });
    }
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', background: '#f7f9fa', minHeight: '100vh', padding: 8 }}>
      {!edit && !payment && nav === 5 && (
        <Profile
          user={user}
          onEdit={() => setEdit(true)}
          onPaymentMethod={() => setPayment(true)}
          onLogout={() => {/* handle logout */}}
        />
      )}
      {edit && <EditProfile user={user} onSave={u => { setUser(u); setEdit(false); }} />}
      {payment && <PaymentMethod user={user} onBack={() => setPayment(false)} />}
      <VoiceGoalInput userId={user.id} selectedLang={currentLang} />
      <SavingsGoals userId={user.id} />
      <WeeklyInsights userId={user.id} />
      <BottomNav value={nav} onChange={setNav} />
    </div>
  );
}
