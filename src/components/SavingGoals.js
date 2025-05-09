import React, { useEffect, useState } from 'react';
import { fetchUserGoals } from '../utils/firestore';
import { Box, Typography, Card, CardContent, LinearProgress, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

function getStatus(goal) {
  const now = new Date();
  const due = new Date(goal.due);
  if (goal.current >= goal.target) return { label: "Completed", color: "success", icon: <CheckCircleIcon color="success" /> };
  if (due < now) return { label: "Behind", color: "error", icon: <CloseIcon color="error" /> };
  if (goal.current / goal.target > 0.8) return { label: "Ahead", color: "success", icon: <CheckCircleIcon color="success" /> };
  if (goal.current / goal.target > 0.5) return { label: "On track", color: "warning", icon: <WarningAmberIcon color="warning" /> };
  return { label: "Behind", color: "error", icon: <CloseIcon color="error" /> };
}

function getGoalIcon(name) {
  if (name.toLowerCase().includes('bicycle')) return <DirectionsBikeIcon />;
  if (name.toLowerCase().includes('gift')) return <CardGiftcardIcon />;
  return <EmojiEventsIcon />;
}

export default function SavingsGoals({ userId }) {
  const [goals, setGoals] = useState([]);
  const [loanGoal, setLoanGoal] = useState(null);

  useEffect(() => {
    async function loadGoals() {
      const data = await fetchUserGoals(userId);
      setGoals(data);
    }
    loadGoals();
  }, [userId]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <EmojiEventsIcon sx={{ mr: 1 }} /> Your Savings Goals
      </Typography>
      {goals.map((goal, idx) => {
        const status = getStatus(goal);
        return (
          <Card key={goal.id || idx} sx={{ mb: 2, background: status.color === "success" ? "#d1fae5" : status.color === "warning" ? "#fef9c3" : "#fee2e2" }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{goal.transcript || goal.name}</Typography>
                {getGoalIcon(goal.transcript || goal.name)}
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                LKR {goal.current?.toLocaleString() || 0} / LKR {goal.target?.toLocaleString() || "?"}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={goal.current && goal.target ? (goal.current / goal.target) * 100 : 0}
                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                color={status.color}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Due: {goal.due}</Typography>
                <Chip icon={status.icon} label={status.label} color={status.color} size="small" />
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary">Edit Goal</Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setLoanGoal(goal)}
                  disabled={status.label === "Completed"}
                >
                  Request Loan
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}

      {/* Loan Request Modal */}
      <Dialog open={!!loanGoal} onClose={() => setLoanGoal(null)}>
        <DialogTitle>Request Loan</DialogTitle>
        <DialogContent>
          <Typography>
            This loan is from other users' unused savings.<br />
            20% of your future daily savings will be auto-deducted for repayment.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoanGoal(null)} color="error" variant="outlined">Cancel</Button>
          <Button onClick={() => { /* handle loan request logic here */ setLoanGoal(null); }} color="success" variant="contained">Agree & Request</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
