import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SavingsIcon from '@mui/icons-material/Savings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';

export default function BottomNav({ value, onChange }) {
  return (
    <BottomNavigation value={value} onChange={(_, v) => onChange(v)} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 400, margin: 'auto', zIndex: 10 }}>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Goals" icon={<FlagIcon />} />
      <BottomNavigationAction label="Savings" icon={<SavingsIcon />} />
      <BottomNavigationAction label="Add" icon={<AddCircleIcon />} />
      <BottomNavigationAction label="Transactions" icon={<ListAltIcon />} />
      <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
