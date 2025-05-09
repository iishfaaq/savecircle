import React, { useState } from 'react';
import { Box, Tabs, Tab, Card, CardContent, Typography, Button } from '@mui/material';

export default function PaymentMethod({ user, onBack }) {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Button onClick={onBack} sx={{ mt: 2 }}>{"< Back"}</Button>
      <Typography variant="h6" sx={{ mt: 2 }}>Payment Method</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 2 }}>
        <Tab label="Account" />
        <Tab label="Card" />
        <Tab label="Reload" />
      </Tabs>
      {tab === 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography>Account Number</Typography>
            <Typography variant="h6">{user.account.number}</Typography>
            <Typography color="text.secondary">{user.account.type}</Typography>
          </CardContent>
        </Card>
      )}
      {tab === 1 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography>Visa</Typography>
            <Typography variant="h6">{user.card.number}</Typography>
            <Typography color="text.secondary">CARD HOLDER<br />{user.card.holder}</Typography>
            <Typography color="text.secondary">EXPIRES<br />{user.card.expires}</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>+ Add New Card</Button>
          </CardContent>
        </Card>
      )}
      {tab === 2 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography>Account Number</Typography>
            <Typography variant="h6">{user.account.number}</Typography>
            <Typography color="text.secondary">{user.account.type}</Typography>
            <Typography sx={{ mt: 2 }}>Instructions</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Go to your bank app or outlet, and reload to above account.
            </Typography>
            <Typography>Recent Reloads</Typography>
            {user.reloads.map((r, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{r.date}</Typography>
                <Typography>LKR {r.amount.toLocaleString()}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
