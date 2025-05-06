import { LogoutButtonWrapper } from "./element";

export const LogoutButton = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return <LogoutButtonWrapper {...props}>Log out</LogoutButtonWrapper>;
};
