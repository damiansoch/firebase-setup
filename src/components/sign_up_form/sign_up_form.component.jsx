import { useState } from "react";

import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../firebase/firebasesign_up_with_email_utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  comfirmPassword: "",
};

const EmailForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, comfirmPassword } = formFields;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resstFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== comfirmPassword) {
      alert("Pasword didn't match!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resstFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already in use");
      } else {
        console.error("user creation encounered an error", error);
      }
    }
  };
  return (
    <div>
      <h1>Sign Up with email and password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="displayName"
          placeholder="Ented Username"
          required
          onChange={changeHandler}
          value={displayName}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          required
          onChange={changeHandler}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
          onChange={changeHandler}
          value={password}
        />
        <input
          type="password"
          name="comfirmPassword"
          placeholder="Comfirm Password"
          required
          onChange={changeHandler}
          value={comfirmPassword}
        />
        <button type="submit">Sing Up</button>
      </form>
    </div>
  );
};
export default EmailForm;
