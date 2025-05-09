import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Typography, Card, CardContent, Button, LinearProgress, Chip, List, ListItem, ListItemText, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SavingsIcon from '@mui/icons-material/Savings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useTranslation } from 'react-i18next';
import { getAISuggestion } from './aiSuggestionUtil'; // or define in the same file

async function fetchAISuggestion(userData) {
  const res = await fetch('http://localhost:3001/ai-suggestion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      goals: userData.goals,
      balance: userData.balance,
      income: userData.income,
      transactions: userData.transactions
    })
  });
  const data = await res.json();
  return data.suggestion;
}

export default function Dashboard({ user, onLogout }) {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [nav, setNav] = useState(0);
  const [aiSuggestion, setAiSuggestion] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(db, "users", user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    }
    fetchUserData();
  }, [user.id]);

  useEffect(() => {
    fetchAISuggestion(userData).then(setAiSuggestion);
  }, [userData]);

  if (!userData) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onLogout}>{t('logout')}</Button>
      </Box>
      <Typography variant="h5" sx={{ mt: 2 }}>{t('welcome_back', { name: userData.name || userData.phone || userData.email })}</Typography>
      <Card sx={{ mt: 2, bgcolor: '#2563eb', color: 'white' }}>
        <CardContent>
          <Typography>{t('total_balance')}</Typography>
          <Typography variant="h4">LKR {userData.balance?.toLocaleString()}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography>{t('income')}<br />LKR {userData.income?.toLocaleString()}</Typography>
            <Typography>{t('savings_percent')}<br />{userData.income ? Math.round((userData.balance / userData.income) * 100) : 0}%</Typography>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">{t('savings_goals')}</Typography>
        {userData.goals?.map((goal, idx) => (
          <Card key={idx} sx={{ mt: 1, bgcolor: goal.status === 'ahead' ? '#d1fae5' : '#e0e7ff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{goal.name}</Typography>
              </Box>
              <Typography variant="body2">LKR {goal.current?.toLocaleString()} / LKR {goal.target?.toLocaleString()}</Typography>
              <LinearProgress variant="determinate" value={goal.current / goal.target * 100} sx={{ mt: 1, mb: 1 }} color={goal.status === 'ahead' ? 'success' : 'primary'} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{t('due')}: {goal.due}</Typography>
                <Chip label={t(goal.status)} color={goal.status === 'ahead' ? 'success' : 'warning'} size="small" />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ mt: 2, bgcolor: '#fef9c3', p: 2, borderRadius: 2 }}>
        <Typography variant="subtitle1">{t('ai_suggestion')}</Typography>
        <Typography variant="body2">
          {aiSuggestion || t('ai_suggestion_default')}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">{t('recent_transactions')}</Typography>
        <List>
          {userData.transactions?.map((tx, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={tx.name}
                secondary={tx.date}
              />
              <Typography color={tx.amount > 0 ? 'green' : 'red'}>
                {tx.amount > 0 ? '+' : ''}LKR {Math.abs(tx.amount)}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
      <BottomNavigation
        showLabels
        value={nav}
        onChange={(_, newValue) => setNav(newValue)}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 400, margin: 'auto', zIndex: 10 }}
      >
        <BottomNavigationAction label={t('home')} icon={<HomeIcon />} />
        <BottomNavigationAction label={t('goals')} icon={<FlagIcon />} />
        <BottomNavigationAction label={t('savings')} icon={<SavingsIcon />} />
        <BottomNavigationAction label={t('add')} icon={<AddCircleIcon />} />
        <BottomNavigationAction label={t('transactions')} icon={<ListAltIcon />} />
      </BottomNavigation>
    </Box>
  );
}
