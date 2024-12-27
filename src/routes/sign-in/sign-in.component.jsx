import { useEffect } from "react";
import {
  auth,
  signInWithGooglePopUp,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import { getRedirectResult } from "firebase/auth";
import { redirect } from "react-router-dom";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

function SignIn() {
  // useEffect(() => {
  //   async function redirect() {
  //     //get the redirect auth result
  //     const result = await getRedirectResult(auth);
  //     if (result) {
  //       const userDocRef = await createUserDocumentFromAuth(result.user);
  //     }
  //     console.log(result);
  //   }
  //   redirect();
  // }, []);

  async function logGoogleUser() {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);

    console.log(userDocRef);
  }
  async function logGoogleUserRedirect() {
    const { user } = await signInWithGoogleRedirect();
    console.log(user);
  }
  return (
    <div>
      <h1> Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in Google</button>
      <button onClick={logGoogleUserRedirect}>
        Sign in with google redirect
      </button>
      <SignUpForm />
    </div>
  );
}
export default SignIn;
