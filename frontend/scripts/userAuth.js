import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

let userLogin = null;
let user;

const userRegister = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const userSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const userCredentials = async () => {
  await onAuthStateChanged(auth, async (currentUser) => {
    // console.log("Current User", currentUser);
    const email = currentUser?.email;

    if (currentUser) {
      userLogin = await currentUser;
      try {
        const response = await fetch("http://localhost:8000/api/v1/users/jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        const token = data.data.token;
        localStorage.setItem("access-token", token);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("access-token");
      }
    } else {
      userLogin = null;
      localStorage.removeItem("access-token");
    }
  });
};

const getUserDetails = async () => {
  // if (!userLogin) {
  //   return false;
  // }

  const token = localStorage.getItem("access-token");

  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/users/user-details",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data?.success) {
      user = await data?.data;
    } else {
      console.log(data);
    }
  } catch (err) {
    console.log("user not fetch:-", err);
  }
};

const init = async () => {
  await userCredentials();
  await getUserDetails();
};
console.log(user);
console.log(userLogin);

init();

const userLogOut = () => {
  signOut(auth).then(() => {
    localStorage.removeItem("access-token");
    alert("User logout.");

    window.location.href = "/";
  });
};

export { user, userLogOut, userRegister, userSignIn };
