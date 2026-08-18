import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Task } from './db';

export const signup = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string,
) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    const user = userCredential.user;
    const uid = user.uid;

    await user.updateProfile({ displayName: name });

    await firestore().collection('users').doc(uid).set({
      uid,
      name,
      email,
      phone,
      address,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return userCredential;
  } catch (error: any) {
    console.log('Error signing up:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    return user;
  } catch (error: any) {
    throw error;
  }
};

export const logout = async () => {
  await auth().signOut();
};

export const getUserDetails = async (uid: string): Promise<any | null> => {
  try {
    const doc = await firestore().collection('users').doc(uid).get();
    if (!doc) return null;
    const data = doc.data ? doc.data() : (doc as any)._data;
    return data ? { uid, ...data } : null;
  } catch (error: any) {
    console.log('Error fetching user details:', error);
    return null;
  }
};
export const saveTasksToFirestore = async (tasks: Task[]) => {
  try {
    const user = auth().currentUser;

    console.log('🔥 Current Firebase user:', user?.uid);

    if (!user) {
      throw new Error('No user logged in');
    }

    const batch = firestore().batch();

    for (const task of tasks) {
      const ref = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('tasks')
        .doc(String(task.id));

      console.log('🔥 Saving task:', {
        path: `users/${user.uid}/tasks/${task.id}`,
        title: task.title,
      });

      batch.set(ref, {
        id: task.id,
        title: task.title,
        completed: 1,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();

    console.log('✅ Firestore batch commit successful');

  } catch (error: any) {
    console.log('🔥 FIRESTORE SAVE ERROR');
    console.log('Code:', error?.code);
    console.log('Message:', error?.message);
    console.log('Error:', error);

    throw error;
  }
};

export const isTaskAlreadySaved = async (
  title: string,
): Promise<boolean> => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw new Error("No user logged in");
  }

  try {
    const snapshot = await firestore()
      .collection("users")
      .doc(uid)
      .collection("tasks")
      .where("title", "==", title.trim())
      .limit(1)
      .get();

    return !snapshot.empty;
  } catch (error) {
    console.log("Error checking task:", error);
    throw error;
  }
};

