import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
function SignIn() {
  async function logGoogleUser() {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);

    console.log(userDocRef);
  }
  return (
    <div>
      <h1> Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in Google</button>
    </div>
  );
}
export default SignIn;
