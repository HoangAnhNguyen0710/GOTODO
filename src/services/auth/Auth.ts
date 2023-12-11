import { firebase, firestore } from "../../config/firebase";
import { User } from "../../models";

export async function createUser(
  user: Omit<User, "id">,
  password: string
) {
  const usernameValidate = await getUserByUsername(user.username);
  if(usernameValidate) {
    throw new Error("Username is exist! please create another one!");
  }
  const newUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, password)
    .then(async (userCredential) => {
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      const newData = await firestore.collection("Users").add(user);
      // const updateDocId = await firestore
      //   .collection("Users")
      //   .doc(newData.id)
      //   .update({ ...user, id: newData.id });
      return newData.get();
    })
    .catch((error) => {
      throw new Error(error.message);
    });
  // tra ve docId cua doc chua user
  return newUser.data() as User;
}

export async function getUserByEmail(email: string | null | undefined): Promise<User | null> {
  if (email) {
    const user = await firestore
      .collection("Users")
      .where("email", "==", email)
      .get();
      if(user.docs.map((item) => ({ ...item.data() }))[0]) {
    return user.docs.map((item) => ({ ...item.data() }))[0] as User;
    }
  }
  return null;
}
export async function getUserByUsername(username: string | null | undefined) {
  if (username) {
    const user = await firestore
      .collection("Users")
      .where("username", "==", username)
      .get();
    return user.docs.map((item) => ({ ...item.data() }))[0];
  }
}

export async function getUserByDocId(docId: string) {
  const data = await firestore.collection("Users").doc(docId).get();
  return data.data();
}

// login thanh cong se tra ve user, neu fail thi bao loi
export async function login(email: string, password: string) {
  const loggedIn = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      return await getUserByEmail(userCredential.user?.email);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
  return loggedIn as User;
}

export async function Logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("user");
      //cho nay them code set lai cai context chua user
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });
}
