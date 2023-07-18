import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IUser {
  displayName: string;
  email: string;
  password: string;
}

export const useAuthentication = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data: IUser) => {
    checkIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);


      return user;
    } catch (error: any) {
      console.log(error.message);
      console.log(typeof error);

      // inicialize db;
      const database = db;

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter no mínimo 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage =
          "Ocorreu um erro inesperado. Por favor tente mais tarde!";
      }

      setError(systemErrorMessage);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
  };
};
