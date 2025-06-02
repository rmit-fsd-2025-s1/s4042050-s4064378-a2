import { BaseButton } from "./BaseButton";

interface EditButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

export const EditButton = ({
  onClick = () => {},
  ariaLabel = "Edit",
  className,
}: EditButtonProps) => {
  return (
    <BaseButton
      style={{ cursor: "pointer" }}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
      >
        <title>{ariaLabel}</title>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
      </svg>
    </BaseButton>
  );
};
