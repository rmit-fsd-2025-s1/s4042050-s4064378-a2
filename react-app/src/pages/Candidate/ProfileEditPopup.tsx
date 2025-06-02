import PopupContainer from "../../components/PopupContainer";
import { User } from "../../types/User";

type Props = {
  onClose: () => void;
  user: User;
};

export const ProfileEditPopup = ({ onClose }: Props) => {
  return (
    <PopupContainer
      isOpen={true}
      onClose={onClose}
      children={undefined}
    ></PopupContainer>
  );
};
