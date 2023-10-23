import { useState } from "react";
import Form from "../../UI/Form"
import FormRow from "../../UI/FormRow"
import Input from "../../UI/Input"
import Button from "../../UI/Button"
import { useLogin } from "./useLogin";
import SpinnerMini from "../../UI/SpinnerMini";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const{login, isLoading}=useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if(!email || !password)return;
    
    login({email,password})
   
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large">{isLoading?<SpinnerMini/>:"login" }</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
