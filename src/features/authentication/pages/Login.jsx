import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import Logo from "../../../shared/components/ui/Logo";
import Heading from "../../../shared/components/ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">سجل الدخول الى حسابك</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
