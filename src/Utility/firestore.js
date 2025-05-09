import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchUserGoals(userId) {
  const q = query(collection(db, "goals"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch transactions for a user for the current week
export async function fetchWeeklyTransactions(userId) {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId),
    where("date", ">=", startOfWeek.toISOString())
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
