import { useState } from "react";
import {
  signInWithGooglePopUp,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useNavigate } from "react-router-dom";
import { ButtonsContainer, SignInFormContainer } from "./sign-in-form.styles";

const defaultFields = {
  email: "",
  password: "",
};
function SignInForm() {
  const navigate = useNavigate();
  const [formFields, setFormField] = useState(defaultFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormField(defaultFields);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signInAuthWithEmailAndPassword(email, password);

      resetFormFields();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password")
        alert("Wrong sign in credentials");
      resetFormFields();
      console.log(error);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormField({ ...formFields, [name]: value });
  }

  async function signInWithGoogle() {
    await signInWithGooglePopUp();
  }

  return (
    <SignInFormContainer>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInFormContainer>
  );
}

export default SignInForm;
