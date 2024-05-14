import React, { useEffect } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import MainSpinner from "../components/MainSpinner";
function Auth() {
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();

  const { data, isLoading, isError } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data]);

  const googleClick = async () => {
    await signInWithRedirect(auth, googleAuthProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const githubClick = async () => {
    await signInWithRedirect(auth, githubAuthProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  if (isLoading) {
    return <MainSpinner />;
  }
  return (
    <div>
      <div className="grid place-content-center text-center gap-5 py-16">
        <h2 className="text-sky-700 text-2xl font-extrabold">
          Welcome to ResumeWiz
        </h2>
        <p>Way To Create Your Resume</p>
        <p>Authenticate</p>
        <button
          onClick={googleClick}
          className="px-4 py-2 border flex justify-center items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-500 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
        <button
          onClick={githubClick}
          className="px-4 py-2 border flex justify-center items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-500 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/361183/github-alt.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Auth;
