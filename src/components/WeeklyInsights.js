import React, { useEffect, useState } from 'react';
import { fetchUserGoals } from '../utils/firestore';
import { Box, Typography, Card, LinearProgress, Paper } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';

const categoryIcons = {
  Food: <RestaurantIcon />,
  Transport: <DirectionsCarIcon />,
  Healthcare: <LocalHospitalIcon />
};

function getCategoryColor(category) {
  if (category === "Food") return "primary";
  if (category === "Transport") return "success";
  if (category === "Healthcare") return "warning";
  return "secondary";
}

// Dummy AI suggestion logic (replace with real AI if needed)
function getWeeklySuggestion(transactions) {
  // Example: If user saves less on weekends, suggest saving on Sunday
  const weekdaySavings = transactions.filter(t => t.type === 'saving' && ![0,6].includes(new Date(t.date).getDay()));
  const weekendSavings = transactions.filter(t => t.type === 'saving' && [0,6].includes(new Date(t.date).getDay()));
  if (weekdaySavings.length > weekendSavings.length) {
    return "Try saving 100 LKR on Sunday to complete your weekly streak!";
  }
  return "Great job with your daily savings habit!";
}

export default function WeeklyInsights({ userId, transactions }) {
  // transactions: [{category, amount, type, date}, ...]
  // You can fetch these from Firestore for the current week

  // Example spending by category (replace with real data)
  const spending = [
    { category: "Food", amount: 3500 },
    { category: "Transport", amount: 2000 },
    { category: "Healthcare", amount: 1000 }
  ];

  // Example AI insight (replace with real AI or rule-based logic)
  const aiInsight = "You're saving more on weekdays than weekends. Great job with your daily savings habit!";
  const aiSuggestion = getWeeklySuggestion(transactions);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <span role="img" aria-label="chart" style={{ marginRight: 8 }}>📊</span> Your Weekly Money Story
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {/* Example: 7 days, show check/warning/cross for each */}
        {["success", "success", "warning", "error", "success", "warning", "success"].map((status, idx) => (
          <span key={idx} style={{ fontSize: 28, margin: 2 }}>
            {status === "success" && <CheckCircleIcon color="success" />}
            {status === "warning" && <WarningAmberIcon color="warning" />}
            {status === "error" && <CloseIcon color="error" />}
          </span>
        ))}
      </Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Spending by Category</Typography>
        {spending.map((item, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <span style={{ marginRight: 8 }}>{categoryIcons[item.category]}</span>
            <Typography sx={{ flex: 1 }}>{item.category}</Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(item.amount / 3500 * 100, 100)}
              color={getCategoryColor(item.category)}
              sx={{ width: 120, height: 8, borderRadius: 4, mx: 2 }}
            />
            <Typography sx={{ minWidth: 80 }}>LKR {item.amount.toLocaleString()}</Typography>
          </Box>
        ))}
      </Paper>
      <Paper sx={{ p: 2, mb: 2, bgcolor: "#e0e7ff" }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <span role="img" aria-label="ai" style={{ marginRight: 8 }}>👤</span>
          {aiInsight}
        </Typography>
        <Typography variant="caption" color="text.secondary">SaveCircle AI</Typography>
      </Paper>
      <Paper sx={{ p: 2, bgcolor: "#fef9c3" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Suggestion</Typography>
        <Typography variant="body2">
          <span role="img" aria-label="bulb" style={{ marginRight: 4 }}>💡</span>
          {aiSuggestion}
        </Typography>
      </Paper>
    </Box>
  );
}
