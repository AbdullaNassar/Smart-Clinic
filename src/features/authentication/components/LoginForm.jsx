import { useState } from "react";
import toast from "react-hot-toast";

import Form from "../../../shared/components/ui/Form";
import FormRow from "../../../shared/components/ui/FormRow";
import Input from "../../../shared/components/ui/Input";
import Button from "../../../shared/components/ui/Button";
import { useLogin } from "../hooks/useLogin";
import SpinnerMini from "../../../shared/components/ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("abdallahmoemen44@gmail.com");
  const [password, setPassword] = useState("123456");

  const { login, isLoading } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error("ادخل البريد الالكتروني");
      return;
    }
    if (!password) {
      toast.error("ادخل كلمة السر");
      return;
    }

    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="البريد الالكتروني" orientation="vertical">
        <Input
          type="email"
          id="email"
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
        <Button size="large">
          {isLoading ? <SpinnerMini /> : "تسجيل دخول"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
