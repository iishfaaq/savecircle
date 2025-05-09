import React from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Profile({ user, onEdit, onPaymentMethod, onLogout }) {
  const { t } = useTranslation();
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onLogout}>{t('logout')}</Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Avatar sx={{ width: 80, height: 80 }} />
        <Typography variant="h6" sx={{ mt: 1 }}>{user.name}</Typography>
        <Typography color="text.secondary">{user.phone}</Typography>
      </Box>
      <Card sx={{ mt: 3, cursor: 'pointer' }} onClick={onEdit}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <span role="img" aria-label="edit" style={{ marginRight: 8 }}>✏️</span>
          <Typography>{t('edit_profile') || "Edit Profile"}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ mt: 2, cursor: 'pointer' }} onClick={onPaymentMethod}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <span role="img" aria-label="card" style={{ marginRight: 8 }}>💳</span>
          <Typography>{t('payment_method') || "Payment Method"}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
