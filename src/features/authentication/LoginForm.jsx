import { useState } from "react";
import Form from "../../UI/Form"
import FormRow from "../../UI/FormRow"
import Input from "../../UI/Input"
import Button from "../../UI/Button"
import { useLogin } from "./useLogin";
import SpinnerMini from "../../UI/SpinnerMini";
import toast from "react-hot-toast";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const{login, isLoading}=useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if(!email){
      toast.error("ادخل البريد الالكتروني")
      return;
    }
    if(!password){
      toast.error('ادخل كلمة السر')
      return;
    }
    
    login({email,password})
   
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="البريد الالكتروني" orientation="vertical">
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
      <FormRow label="كلمة السر" orientation="vertical">
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
        <Button size="large">{isLoading?<SpinnerMini/>:"تسجيل دخول" }</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
