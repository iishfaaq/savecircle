import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function EditProfile({ user, onSave }) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = async () => {
    await updateDoc(doc(db, "users", user.id), { name, phone });
    onSave({ ...user, name, phone });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth sx={{ mb: 2 }} />
      <TextField label="Phone" value={phone} onChange={e => setPhone(e.target.value)} fullWidth sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </Box>
  );
}
