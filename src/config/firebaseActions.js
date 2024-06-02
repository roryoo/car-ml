import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

export const saveUserActivity = async (userId, carModel, predictedPrice) => {
  try {
    await addDoc(collection(db, 'userActivities'), {
      userId,
      carModel,
      predictedPrice,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Error saving user activity:", error);
  }
};
