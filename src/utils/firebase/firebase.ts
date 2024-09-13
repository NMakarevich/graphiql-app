import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import firebaseConfig from '@/utils/firebase/firebaseConfig';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const token = await user.getIdToken();

  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);

  if (docs.docs.length === 0) {
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'google',
      name: user.displayName || '',
      email: user.email,
      password: '',
      token,
    });
    return { user, token };
  } else {
    const userDoc = docs.docs[0];
    await updateDoc(doc(db, 'users', userDoc.id), {
      token,
    });
  }
};

export const loginWithGoogle = async () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      return { token, user };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(
        'Error signing in with Google:',
        errorCode,
        errorMessage,
        email,
        credential
      );
    });
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;
  const token = await user.getIdToken();

  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length > 0) {
    const userDoc = docs.docs[0];
    await updateDoc(doc(db, 'users', userDoc.id), {
      token,
    });
  }

  return { user, token };
};

export const signUpWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  const token = await user.getIdToken();

  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    authProvider: 'local',
    name,
    email,
    password,
    token,
  });

  await updateProfile(user, { displayName: name });

  return user;
};

export const logout = async (): Promise<{ userAuth: boolean }> => {
  const user = auth.currentUser;

  if (user) {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length > 0) {
      const userDoc = docs.docs[0];
      await updateDoc(doc(db, 'users', userDoc.id), {
        token: '',
      });
    }
  }

  await signOut(auth);
  return { userAuth: false };
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
};
