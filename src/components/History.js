import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import "../styles/History.css";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchHistory = async (uid) => {
      const q = query(collection(db, "history"), where("uid", "==", uid));
      try {
        const querySnapshot = await getDocs(q);
        const historyItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHistoryData(historyItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history data:", error);
        setLoading(false);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchHistory(user.uid);
      } else {
        // Handle user not signed in or handle differently
        setLoading(false);
        console.log("User is not logged in.");
      }
    });
  }, [auth]);

  if (loading) {
    return <div>Loading history...</div>;
  }

  if (!historyData.length) {
    return <div>No history found.</div>;
  }

  return (
    <div className="history-container">
      <h1>User History</h1>
      <ul>
        {historyData.map(item => (
          <li key={item.id}>
            <p>Date: {item.timestamp.toDate().toString()}</p>
            <p>Car Type: {item.carType}</p>
            <p>Action: {JSON.stringify(item.action)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
