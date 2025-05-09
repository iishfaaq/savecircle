const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

async function allocateDailySavingsForUser(userId) {
  // 1. Get user and their daily saving plan
  const userRef = db.collection('users').doc(userId);
  const userSnap = await userRef.get();
  if (!userSnap.exists) return;
  const user = userSnap.data();
  if (!user.dailySavingLocked || !user.dailySavingAmount) return;

  let amountLeft = user.dailySavingAmount;

  // 2. Get user's active goals, ordered by due date
  const goalsSnap = await db.collection('goals')
    .where('userId', '==', userId)
    .get();

  // Filter out completed goals and sort by due date
  const goals = goalsSnap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(goal => goal.current < goal.target)
    .sort((a, b) => new Date(a.due) - new Date(b.due));

  // 3. Allocate savings
  for (const goal of goals) {
    if (amountLeft <= 0) break;
    const needed = goal.target - goal.current;
    const toAdd = Math.min(needed, amountLeft);

    // Update goal
    await db.collection('goals').doc(goal.id).update({
      current: goal.current + toAdd
    });

    // Optionally, log transaction
    await db.collection('transactions').add({
      userId,
      goalId: goal.id,
      amount: toAdd,
      date: new Date().toISOString(),
      type: 'auto-allocation'
    });

    amountLeft -= toAdd;
  }
}

// Example: allocate for all users (to be run daily)
async function allocateForAllUsers() {
  const usersSnap = await db.collection('users').where('dailySavingLocked', '==', true).get();
  for (const userDoc of usersSnap.docs) {
    await allocateDailySavingsForUser(userDoc.id);
  }
}

module.exports = { allocateForAllUsers };
