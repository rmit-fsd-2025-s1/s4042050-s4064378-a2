export const BaseButton = ({
  type,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};
