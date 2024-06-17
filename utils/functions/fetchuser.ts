import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import LoginData from "../interfaces/logindata";
import UserData from "../interfaces/userdata";

export default async function fetchUserData(loginData: LoginData) {
    try {
      const queryUser = query(collection(db, 'users'), where('uid', '==', loginData.uid));
      const querySnapshot = await getDocs(queryUser);
      const doc = querySnapshot.docs[0];
      console.log(doc);
      const userData = {
        uid: doc.data().uid,
        email: doc.data().email,
        displayName: doc.data().displayName,
        type: doc.data().type,
      } as UserData;
      return userData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }