import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import SpinnerMini from "../../../shared/components/ui/SpinnerMini";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;

  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user, isLoading } = useUser();
  if (isLoading) return <SpinnerMini />;
  if (!user) return <h2>loading...</h2>;

  const { fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        src={
          avatar ||
          "https://res.cloudinary.com/deuxt0stn/image/upload/v1755921122/profilePics/u7zdcwtc2ddvwg9ijjug.jpg"
        }
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
