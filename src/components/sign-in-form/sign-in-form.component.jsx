import FormInput from "../form-input/form-input.component";
import {
  auth,
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase";
import Button from "../button/button.component";
import { useState } from "react";
import "./sign-in-form.styles.scss";

const defaultFields = {
  email: "",
  password: "",
};
function SignInForm() {
  const [formFields, setFormField] = useState(defaultFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormField(defaultFields);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await signInAuthWithEmailAndPassword(auth, email, password);
      console.log(user);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/wrong-password")
        alert("Wrong sign in credentials");
      console.log("could not sign in");
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormField({ ...formFields, [name]: value });
  }
  async function signInWithGoogle() {
    const { user } = await signInWithGooglePopUp();
    await createUserDocumentFromAuth(user);
  }

  return (
    <div className="sign-in-form-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            name: "email",
            value: email,
            onChange: handleChange,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            name: "password",
            value: password,
            onChange: handleChange,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
