import { useState } from "react";
import {
  createAuthFromEmailandPassword,
  auth,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function SignUpForm() {
  const [formField, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formField;

  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    //confirm passwords match
    if (password !== confirmPassword) return;
    try {
      //create auth user from email and password
      const { user } = await createAuthFromEmailandPassword(
        auth,
        email,
        password
      );
      //create userRefDocs on the firestore
      await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (error) {
      console.log(error.message);
      alert("could not create user", error.message);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    //state updating function
    setFormField({ ...formField, [name]: value });
  }
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          inputOptions={{
            type: "text",
            onChange: handleChange,
            name: "displayName",
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        <FormInput
          label="confirmPassword"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />
        <Button>Submit Form</Button>
      </form>
    </div>
  );
}
export default SignUpForm;