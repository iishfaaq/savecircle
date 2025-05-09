import React from 'react';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function PhoneSelector({ users, onSelect }) {
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState('');

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">{t('select_phone')}</Typography>
      <Select
        value={selected}
        onChange={e => setSelected(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      >
        {users.map(user => (
          <MenuItem key={user.id} value={user.id}>
            {user.phone || user.email}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={!selected}
        onClick={() => onSelect(users.find(u => u.id === selected))}
      >
        {t('continue')}
      </Button>
    </Box>
  );
}
