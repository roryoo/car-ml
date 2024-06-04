import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function UserHistory() {
  const [history, setHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setCurrentUser(user);
        const q = query(collection(db, 'userHistory'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        setHistory(data);
      } else {
        setCurrentUser(null);
        setHistory([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (!currentUser) {
    return <p>Please log in to view your history.</p>;
  }

  return (
    <div>
      <h2>Your History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              <pre>{JSON.stringify(entry.data, null, 2)}</pre>
              <p>{new Date(entry.timestamp.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
}

export default UserHistory;
