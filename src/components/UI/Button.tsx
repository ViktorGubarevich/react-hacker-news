import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const Button = ({
  type,
  className,
  onClick,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    {...props}
    type={type ?? "button"}
    className={clsx(styles.reload, className)}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
